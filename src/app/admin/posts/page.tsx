'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Sparkles,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  ImageIcon,
  Calendar,
  User,
} from 'lucide-react'

type Post = {
  id: string
  slug: string
  title: string
  summary: string | null
  coverImageUrl: string | null
  status: string
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  createdBy: {
    email: string
    name: string | null
  }
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    filterPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, searchQuery, statusFilter])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách tin tức',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((post) => post.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.slug.toLowerCase().includes(query) ||
          post.summary?.toLowerCase().includes(query)
      )
    }

    setFilteredPosts(filtered)
  }

  const handleDelete = async () => {
    if (!selectedPost) return

    try {
      const response = await fetch(`/api/admin/posts/${selectedPost.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      toast({
        title: 'Thành công',
        description: 'Đã xóa tin tức',
      })

      setShowDeleteDialog(false)
      setSelectedPost(null)
      fetchPosts()
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa tin tức',
        variant: 'destructive',
      })
    }
  }

  const handleToggleStatus = async (post: Post) => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'

    try {
      const response = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          publishedAt: newStatus === 'PUBLISHED' ? new Date() : null,
        }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      toast({
        title: 'Thành công',
        description: `Đã ${newStatus === 'PUBLISHED' ? 'xuất bản' : 'chuyển về nháp'}`,
      })

      fetchPosts()
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật trạng thái',
        variant: 'destructive',
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Đã xuất bản
          </Badge>
        )
      case 'DRAFT':
        return (
          <Badge className="bg-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            Nháp
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản Lý Tin Tức</h1>
          <p className="text-gray-600 mt-1">
            Tạo và quản lý tin tức với AI Content Generation
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-brand-orange-primary to-brand-orange-dark">
          <Link href="/admin/posts/new">
            <Sparkles className="mr-2 h-4 w-4" />
            Tạo Tin Tức Với AI
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tiêu đề, slug, mô tả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                  <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
                  <SelectItem value="DRAFT">Nháp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng số</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã xuất bản</p>
                <p className="text-2xl font-bold">
                  {posts.filter((p) => p.status === 'PUBLISHED').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nháp</p>
                <p className="text-2xl font-bold">
                  {posts.filter((p) => p.status === 'DRAFT').length}
                </p>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tuần này</p>
                <p className="text-2xl font-bold">
                  {
                    posts.filter(
                      (p) =>
                        new Date(p.createdAt) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-brand-orange-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Danh Sách Tin Tức ({filteredPosts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchQuery || statusFilter !== 'ALL'
                  ? 'Không tìm thấy tin tức nào'
                  : 'Chưa có tin tức nào. Hãy tạo tin tức đầu tiên!'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="group flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 hover:shadow-md transition-all"
                >
                  {/* Cover Image */}
                  <div className="flex-shrink-0">
                    {post.coverImageUrl ? (
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-orange-primary transition-colors">
                            {post.title}
                          </h3>
                          {getStatusBadge(post.status)}
                        </div>
                        {post.summary && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {post.summary}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.createdBy.name || post.createdBy.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.updatedAt)}
                          </span>
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            /{post.slug}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(post)}
                          className="whitespace-nowrap"
                        >
                          {post.status === 'PUBLISHED' ? (
                            <>
                              <XCircle className="h-4 w-4 mr-1" />
                              Gỡ xuống
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Xuất bản
                            </>
                          )}
                        </Button>
                        {post.status === 'PUBLISHED' && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/news/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPost(post)
                            setShowDeleteDialog(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn xóa tin tức &quot;{selectedPost?.title}&quot;? Hành động này
              không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
