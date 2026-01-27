'use client'
import { useEffect, useState } from 'react'
import TopHeading from '../components/TopHeading'
import CommonTable from '../components/commonTable'
import { AddCommonModal } from '../components/AddCommonModal'
import DeleteCommonModal from '../components/DeleteCommonModal'
import { apiService } from '../utils/apiService'
import { API_ENDPOINTS } from '../config/apiEndpoints'
import { toast } from 'react-toastify'
import AddBanners from './AddBanners'

interface Banner {
  id: number
  image: string
  title: string
  subtitle: string
}

const Banners = () => {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [deleteBanner, setDeleteBanner] = useState<Banner | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchBanners = async () => {
    setLoading(true)
    const res = await apiService.getAll<Banner>(API_ENDPOINTS.BANNERS)
    if (res.success) {
      setBanners(res.data)
    } else {
      toast.error(res.error || 'Failed to load banners')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const handleDeleteConfirm = async () => {
    if (!deleteBanner) return
    setIsDeleting(true)

    const res = await apiService.delete(API_ENDPOINTS.BANNERS, deleteBanner.id)
    if (res.success) {
      toast.success('Banner deleted')
      fetchBanners()
      setDeleteBanner(null)
    } else {
      toast.error('Delete failed')
    }

    setIsDeleting(false)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'image',
      label: 'Image',
      render: (src: string) => (
        <img
          src={src || 'https://placehold.co/80x50'}
          className="h-10 w-16 rounded object-cover"
        />
      ),
    },
    { key: 'title', label: 'Title' },
    { key: 'subtitle', label: 'Subtitle' },
  ]

  return (
    <div className="space-y-4">
      <TopHeading
        title="Banners"
        addButtonText="Add Banner"
        onAddNew={() => {
          setEditingBanner(null)
          setIsModalOpen(true)
        }}
      />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <CommonTable
          columns={columns}
          data={banners}
          onEdit={(row) => {
            setEditingBanner(row)
            setIsModalOpen(true)
          }}
          onDelete={(row) => setDeleteBanner(row)}
        />
      )}

      {/* ADD / EDIT MODAL */}
      <AddCommonModal
        isOpen={isModalOpen}
        title={editingBanner ? 'Edit Banner' : 'Add Banner'}
        onClose={() => setIsModalOpen(false)}
      >
        <AddBanners
          bannerId={editingBanner?.id}
          onSuccess={() => {
            setIsModalOpen(false)
            fetchBanners()
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </AddCommonModal>

      {/* DELETE MODAL */}
      <DeleteCommonModal
        isOpen={!!deleteBanner}
        title="Delete Banner"
        message={`Delete "${deleteBanner?.title}" ?`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        onCancel={() => setDeleteBanner(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}

export default Banners
