import * as cheerio from 'cheerio'
import { TrackingAdapter, TrackingResult } from './types'

const TRACKING_URL = 'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do'
const REQUIRED_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  'Referer': TRACKING_URL,
}

const normalize = (v: string) => v.replace(/\s+/g, ' ').trim()

export class ShipmentLinkAdapter implements TrackingAdapter {
  name = 'ShipmentLink'
  baseUrl = TRACKING_URL

  async track(type: 'BOL' | 'BOOKING', code: string): Promise<TrackingResult> {
    try {
      const bookingNo = code.trim()

      // Build payload for ShipmentLink
      const payload = new URLSearchParams({
        TYPE: 'BK',
        bkno: bookingNo,
        SEL: 'bk',
        NO: bookingNo,
      })

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: REQUIRED_HEADERS,
        body: payload.toString(),
      })

      if (!response.ok) {
        return {
          success: false,
          error: 'Không thể kết nối với hệ thống ShipmentLink',
        }
      }

      const html = await response.text()
      console.log('[ShipmentLink] HTML snippet:', html.slice(0, 1000))

      return await this.parseHTML(html, bookingNo)
    } catch (error) {
      console.error('ShipmentLink tracking error:', error)
      return {
        success: false,
        error: 'Lỗi khi tra cứu thông tin. Vui lòng thử lại sau.',
      }
    }
  }

  private async parseHTML(html: string, bookingNo: string): Promise<TrackingResult> {
    const $ = cheerio.load(html)

    // Check if no results found
    const bodyText = $('body').text()
    const noResults = bodyText.includes('No data found') || bodyText.includes('조회된 결과가 없습니다')

    if (noResults) {
      return {
        success: false,
        error: 'Không tìm thấy thông tin. Vui lòng kiểm tra lại mã số.',
      }
    }

    try {
      // Helper to derive onboard_date (YYYYMMDD) from date like APR-30-2025
      const monthMap: Record<string, string> = {
        JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
        JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12'
      }

      const toOnboard = (raw: string): string => {
        if (!raw) return ''
        const m = raw.trim().toUpperCase()
        // Expect formats: APR-30-2025 or 30-APR-2025
        if (/^[A-Z]{3}-\d{2}-\d{4}$/.test(m)) {
          const [mon, dd, yyyy] = m.split('-')
          return `${yyyy}${monthMap[mon] || ''}${dd}`
        }
        if (/^\d{2}-[A-Z]{3}-\d{4}$/.test(m)) {
          const [dd, mon, yyyy] = m.split('-')
          return `${yyyy}${monthMap[mon] || ''}${dd}`
        }
        if (/^\d{8}$/.test(m)) return m
        return ''
      }

      // Basic Information
      const vessel = $('th:contains("Vessel Voyage")')
        .closest('tr')
        .find('td')
        .last()
        .text()
        .replace(/\s+/g, ' ')
        .trim()

      const polRow = $('th:contains("Port of Loading")').closest('tr')
      const podRow = $('th:contains("Port of Discharge")').closest('tr')

      const pol = polRow.find('td').eq(0).text().trim()
      const etd = polRow.find('td').eq(3).text().trim()
      const pod = podRow.find('td').eq(0).text().trim()
      const eta = podRow.find('td').eq(1).text().trim()
      const status = $('th:contains("Booking Status")').closest('tr').find('td').last().text().trim()

      console.log('[ShipmentLink] Basic info:', { bookingNo, vessel, pol, pod, etd, eta, status })

      // Extract hidden inputs for container moves
      const hiddenPol = $('input[name="pol"]').attr('value')?.trim() || ''
      const hiddenOnboard = $('input[name="onboard_date"]').attr('value')?.trim() || ''

      interface OutMove {
        date: string
        move: string
        location: string
        vesselVoyage: string
      }

      interface OutContainer {
        number: string
        size: string
        service: string
        quantity: string
        measurement: string
        grossWeight: string
        tareWeight: string
        method: string
        vgm: string
        pickupDate: string
        pickupDepot: string
        fullInDate: string
        returnDepot: string
        status?: string
        moves: OutMove[]
      }

      const containerMap = new Map<string, OutContainer>()

      // Parse Container Activity Information
      $('table').each((_, table) => {
        const tableText = $(table).text()
        if (!/Container Activity Information/i.test(tableText)) return

        $(table)
          .find('tr')
          .slice(1)
          .each((__, tr) => {
            const cols = $(tr)
              .find('td')
              .map((i, c) => normalize($(c).text()))
              .get()

            if (!cols.length) return

            const rowLower = cols.join(' ').toLowerCase()
            if (/click container no|disclaimer|back/i.test(rowLower)) return
            if (cols.length < 13) return

            const cont = cols[0]
            if (!cont || !/^[A-Z0-9]{6,}$/i.test(cont)) return

            if (!containerMap.has(cont)) {
              containerMap.set(cont, {
                number: cols[0] || '',
                size: cols[1] || '',
                service: cols[2] || '',
                quantity: cols[3] || '',
                measurement: cols[4] || '',
                grossWeight: cols[5] || '',
                tareWeight: cols[6] || '',
                method: cols[7] || '',
                vgm: cols[8] || '',
                pickupDate: cols[9] || '',
                pickupDepot: cols[10] || '',
                fullInDate: cols[11] || '',
                returnDepot: cols[12] || '',
                moves: [],
              })
            }
          })
      })

      console.log('[ShipmentLink] Containers found:', containerMap.size)

      const containers = Array.from(containerMap.values())

      // Fetch Container Moves concurrently
      await Promise.all(
        containers.map(async (c) => {
          try {
            const derivedOnboard = hiddenOnboard || toOnboard(etd) || toOnboard(c.fullInDate) || toOnboard(c.pickupDate)
            const form = new URLSearchParams({
              bl_no: bookingNo,
              cntr_no: c.number,
              onboard_date: derivedOnboard || '',
              pol: hiddenPol || pol || '',
              TYPE: 'CntrMove',
            })

            const mvRes = await fetch(TRACKING_URL, {
              method: 'POST',
              headers: REQUIRED_HEADERS,
              body: form.toString(),
            })

            if (!mvRes.ok) return

            const mvHtml = await mvRes.text()
            const $$ = cheerio.load(mvHtml)

            let found = false
            $$('table').each((_, t) => {
              const tableText = normalize($$(t).text())
              if (/Container Moves/i.test(tableText) && !found) {
                found = true
                $$(t)
                  .find('tr')
                  .slice(1)
                  .each((__, r) => {
                    const cols = $$(r)
                      .find('td')
                      .map((i, cell) => normalize($$(cell).text()))
                      .get()

                    if (cols.length < 2) return

                    const [date, move, location, vesselVoyage] = [
                      cols[0] || '',
                      cols[1] || '',
                      cols[2] || '',
                      cols[3] || ''
                    ]

                    if (!date && !move) return
                    c.moves.push({ date, move, location, vesselVoyage })
                  })
              }
            })

            if (c.moves.length) {
              c.status = c.moves[c.moves.length - 1].move
            }

            console.log('[ShipmentLink] Moves for', c.number, ':', c.moves.length)
          } catch (e) {
            console.error('[ShipmentLink] Error fetching moves:', e)
          }
        })
      )

      // Format containers for output with full data
      const formattedContainers = containers.map(c => ({
        number: c.number,
        containerNo: c.number,
        size: c.size,
        service: c.service,
        type: c.service,
        quantity: c.quantity,
        measurement: c.measurement,
        grossWeight: c.grossWeight,
        tareWeight: c.tareWeight,
        weight: c.grossWeight,
        status: c.status || status,
        moves: c.moves || [],
      }))

      if (!bookingNo && !containers.length) {
        return {
          success: false,
          error: 'Không có dữ liệu',
        }
      }

      // Split vessel and voyage
      const vesselParts = vessel.split(/\s+/)
      const voyageNum = vesselParts.length >= 2 ? vesselParts[vesselParts.length - 1] : 'N/A'
      const vesselName = vesselParts.length >= 2 ? vesselParts.slice(0, -1).join(' ') : vessel

      return {
        success: true,
        data: {
          bookingNo: bookingNo,
          vessel: vesselName || 'N/A',
          voyage: voyageNum,
          pol: pol || 'N/A',
          pod: pod || 'N/A',
          etd: etd || 'N/A',
          eta: eta || 'N/A',
          status: status || 'In Transit',
          containers: formattedContainers.length > 0 ? formattedContainers : [],
        },
      }
    } catch (error) {
      console.error('Error parsing ShipmentLink HTML:', error)
      return {
        success: false,
        error: 'Lỗi khi xử lý dữ liệu. Vui lòng thử lại sau.',
      }
    }
  }
}
