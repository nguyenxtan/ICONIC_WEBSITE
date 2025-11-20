'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Ship, MapPin, Calendar, ChevronDown } from 'lucide-react'
import { TrackingResult, Container } from '@/lib/adapters/types'


const SHIPPING_LINES = [
  { value: 'evergreen', label: 'Evergreen Line', status: 'active' },
  { value: 'maersk', label: 'Maersk', status: 'coming' },
  { value: 'cosco', label: 'COSCO', status: 'coming' },
  { value: 'one', label: 'Ocean Network Express (ONE)', status: 'coming' },
  { value: 'msc', label: 'MSC', status: 'coming' },
  { value: 'cma', label: 'CMA CGM', status: 'coming' },
]

export default function TrackingPage() {
  const [shippingLine, setShippingLine] = useState('evergreen')
  const [type, setType] = useState<'BOL' | 'BOOKING'>('BOOKING')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [expandedContainers, setExpandedContainers] = useState<Record<string, boolean>>({})

  const toggleContainer = (containerNo: string) => {
    setExpandedContainers(prev => ({
      ...prev,
      [containerNo]: !prev[containerNo]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    const selectedLine = SHIPPING_LINES.find(line => line.value === shippingLine)
    if (selectedLine?.status === 'coming') {
      setResult({
        success: false,
        error: `Chức năng tracking ${selectedLine.label} đang được phát triển. Hiện tại chỉ hỗ trợ Evergreen Line.`,
      })
      return
    }

    setLoading(true)
    setResult(null)
    setExpandedContainers({})

    try {
      // All shipping lines use the evergreen endpoint (which uses ShipmentLink)
      const response = await fetch('/api/tracking/evergreen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, code: code.trim() }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: 'Lỗi kết nối. Vui lòng thử lại sau.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tracking Container
          </h1>
          <p className="text-lg text-gray-600">
            Tra cứu thông tin vận đơn và container real-time
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Nhập Thông Tin Tra Cứu</CardTitle>
            <CardDescription>
              Tra cứu container từ các hãng tàu lớn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shipping Line Selector */}
              <div>
                <Label htmlFor="shipping-line">Hãng Tàu</Label>
                <div className="relative mt-2">
                  <select
                    id="shipping-line"
                    value={shippingLine}
                    onChange={(e) => setShippingLine(e.target.value)}
                    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm focus:border-brand-orange-primary focus:outline-none focus:ring-2 focus:ring-brand-orange-primary/20"
                  >
                    {SHIPPING_LINES.map((line) => (
                      <option key={line.value} value={line.value}>
                        {line.label}
                        {line.status === 'coming' ? ' (Sắp ra mắt)' : ''}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label>Loại Tra Cứu</Label>
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setType('BOL')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      type === 'BOL'
                        ? 'border-brand-orange-primary bg-brand-orange-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">Bill of Lading (B/L)</div>
                    <div className="text-sm text-gray-600">
                      Vận đơn đường biển
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('BOOKING')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      type === 'BOOKING'
                        ? 'border-brand-orange-primary bg-brand-orange-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">Booking Number</div>
                    <div className="text-sm text-gray-600">
                      Số đặt chỗ container
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="code">
                  {type === 'BOL' ? 'B/L Number' : 'Booking Number'}
                </Label>
                <Input
                  id="code"
                  placeholder={
                    type === 'BOL'
                      ? 'Ví dụ: EGLV123456789'
                      : 'Ví dụ: 235501399132'
                  }
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !code.trim()}
                className="w-full"
              >
                {loading ? (
                  'Đang tra cứu...'
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Tra Cứu
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {result.success ? 'Kết Quả Tra Cứu' : 'Không Tìm Thấy'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.success && result.data ? (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.data.bookingNo && (
                        <div>
                          <div className="text-sm text-gray-600">Mã tra cứu</div>
                          <div className="font-semibold break-all">{result.data.bookingNo}</div>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <Ship className="h-5 w-5 text-brand-orange-primary mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">Vessel Voyage</div>
                          <div className="font-semibold">{result.data.vessel || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-brand-orange-primary mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">Port of Loading</div>
                          <div className="font-semibold">{result.data.pol || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-brand-orange-primary mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">Port of Discharge</div>
                          <div className="font-semibold">{result.data.pod || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-brand-orange-primary mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">ETD (Dự kiến khởi hành)</div>
                          <div className="font-semibold">{result.data.etd || 'N/A'}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-brand-orange-primary mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">ETA (Dự kiến đến)</div>
                          <div className="font-semibold">{result.data.eta || 'N/A'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        Status:{' '}
                        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                          {result.data.status || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Containers Table */}
                    {result.data.containers && result.data.containers.length > 0 && (
                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">#</th>
                              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Container No</th>
                              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Size</th>
                              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Service</th>
                              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Weight</th>
                              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Status</th>
                              <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">Chi tiết</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 bg-white">
                            {result.data.containers.map((container: Container, i: number) => {
                              const isOpen = expandedContainers[container.number]
                              const rowWeight = container.grossWeight || container.weight || '-'

                              return (
                                <>
                                  <tr key={container.number} className="hover:bg-gray-50">
                                    <td className="px-3 py-3 text-gray-500">{i + 1}</td>
                                    <td className="px-3 py-3 font-medium text-gray-900">{container.number}</td>
                                    <td className="px-3 py-3 text-gray-800">{container.size || '-'}</td>
                                    <td className="px-3 py-3 text-gray-800">{container.service || container.type || '-'}</td>
                                    <td className="px-3 py-3 text-gray-800">{rowWeight}</td>
                                    <td className="px-3 py-3 text-gray-800">{container.status || '-'}</td>
                                    <td className="px-3 py-3 text-right">
                                      {container.moves && container.moves.length > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => toggleContainer(container.number)}
                                          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-100"
                                        >
                                          <span>{isOpen ? '−' : '+'}</span>
                                          <span className="hidden sm:inline">
                                            {isOpen ? 'Thu gọn' : 'Xem chi tiết'}
                                          </span>
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                  {isOpen && container.moves && container.moves.length > 0 && (
                                    <tr key={`${container.number}-moves`} className="bg-gray-50">
                                      <td colSpan={7} className="px-6 py-4">
                                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                          <h4 className="mb-3 text-sm font-semibold text-gray-700">Container Moves</h4>
                                          <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 text-xs">
                                              <thead className="bg-gray-100">
                                                <tr>
                                                  <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-gray-500">Date</th>
                                                  <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-gray-500">Container Move</th>
                                                  <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-gray-500">Location</th>
                                                  <th className="px-3 py-2 text-left font-medium uppercase tracking-wide text-gray-500">Vessel Voyage</th>
                                                </tr>
                                              </thead>
                                              <tbody className="divide-y divide-gray-100">
                                                {container.moves.map((move, mi) => (
                                                  <tr key={mi} className="hover:bg-gray-50">
                                                    <td className="px-3 py-2 text-gray-700">{move.date || '-'}</td>
                                                    <td className="px-3 py-2 text-gray-700">{move.move || '-'}</td>
                                                    <td className="px-3 py-2 text-gray-700">{move.location || '-'}</td>
                                                    <td className="px-3 py-2 text-gray-700">{move.vesselVoyage || '-'}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-red-600 font-semibold mb-2">
                      {result.error || 'Không tìm thấy thông tin'}
                    </div>
                    <p className="text-gray-600 text-sm">
                      Vui lòng kiểm tra lại mã số hoặc liên hệ với chúng tôi để được hỗ trợ
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Lưu Ý</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Thông tin cập nhật từ hệ thống của hãng tàu</li>
            <li>• ETA/ETD có thể thay đổi tùy thuộc vào tình hình thực tế</li>
            <li>• Liên hệ 0839037568 để được hỗ trợ chi tiết</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
