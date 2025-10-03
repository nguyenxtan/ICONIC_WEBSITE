import * as cheerio from 'cheerio'
import { TrackingAdapter, TrackingResult, Container } from './types'

export class EvergreenAdapter implements TrackingAdapter {
  private baseUrl = 'https://www.shipmentlink.com/servlet/TDB1_CargoTracking.do'

  async track(type: 'BOL' | 'BOOKING', code: string): Promise<TrackingResult> {
    try {
      const formData = new URLSearchParams()
      if (type === 'BOL') {
        formData.append('blNo', code)
      } else {
        formData.append('refNo', code)
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        body: formData.toString(),
      })

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status}`,
        }
      }

      const html = await response.text()
      const $ = cheerio.load(html)

      // Check for error messages
      const errorMsg = $('.error-message').text().trim()
      if (errorMsg) {
        return {
          success: false,
          error: errorMsg || 'Không tìm thấy thông tin',
        }
      }

      // Parse vessel information
      const vessel = $('td:contains("Vessel Name")').next().text().trim()
      const voyage = $('td:contains("Voyage")').next().text().trim()
      const pol = $('td:contains("POL")').next().text().trim()
      const pod = $('td:contains("POD")').next().text().trim()
      const etd = $('td:contains("ETD")').next().text().trim()
      const eta = $('td:contains("ETA")').next().text().trim()

      // Parse container list
      const containers: Container[] = []
      $('table.container-table tbody tr').each((_, row) => {
        const cols = $(row).find('td')
        if (cols.length >= 2) {
          containers.push({
            number: $(cols[0]).text().trim(),
            type: $(cols[1]).text().trim(),
            size: $(cols[2]).text().trim(),
            status: $(cols[3]).text().trim(),
          })
        }
      })

      // If no structured data found, try alternative parsing
      if (!vessel && !voyage) {
        // Alternative: look for any table data
        const allText = $('body').text()
        if (
          allText.includes('No records found') ||
          allText.includes('not found')
        ) {
          return {
            success: false,
            error: 'Không tìm thấy thông tin vận đơn',
          }
        }
      }

      return {
        success: true,
        data: {
          vessel: vessel || 'N/A',
          voyage: voyage || 'N/A',
          pol: pol || 'N/A',
          pod: pod || 'N/A',
          eta: eta || 'N/A',
          etd: etd || 'N/A',
          status: containers.length > 0 ? 'In Transit' : 'Unknown',
          containers:
            containers.length > 0
              ? containers
              : [
                  {
                    number: code,
                    status: 'Đang tra cứu thông tin chi tiết',
                  },
                ],
        },
      }
    } catch (error) {
      console.error('Evergreen tracking error:', error)
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Lỗi kết nối đến Evergreen',
      }
    }
  }
}
