'use client'
import { useEffect, useState } from 'react'
import TopHeading from '../components/TopHeading'
import CommonTable from '../components/commonTable'
import { AddCommonModal } from '../components/AddCommonModal'
import DeleteCommonModal from '../components/DeleteCommonModal'
import AddSubCategory from './AddSubCategory'
import { apiService } from '../utils/apiService'
import { API_ENDPOINTS } from '../config/apiEndpoints'
import { toast } from 'react-toastify'

interface SubCategoryRow {
  id: number
  category_id: number
  name: string
  slug: string
  status: number
  category_name: string
}

const SubCategory = () => {
  const [subcategories, setSubcategories] = useState<SubCategoryRow[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategoryRow | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletingSubCategory, setDeletingSubCategory] = useState<SubCategoryRow | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'category_name', label: 'Category' },
    { key: 'name', label: 'Subcategory' },
    {
      key: 'status',
      label: 'Status',
      render: (value: number, row: SubCategoryRow) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={value === 1}
            onChange={(e) => toggleStatus(row, e.target.checked ? 1 : 0)}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#4C7C3C] relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
          <span className="ml-2 text-sm" style={{ color: '#595959' }}>{value === 1 ? 'Active' : 'Inactive'}</span>
        </label>
      )
    }
  ]

  const fetchSubCategories = async () => {
    setIsLoading(true)
    try {
      const response = await apiService.getAll<SubCategoryRow>(API_ENDPOINTS.SUBCATEGORY)
      if (response.success && response.data) {
        setSubcategories(response.data)
      } else {
        console.error('Failed to load subcategories:', response.error)
        toast.error(response.error || 'Failed to load subcategories')
      }
    } catch (error) {
      console.error('Error loading subcategories:', error)
      toast.error('Failed to load subcategories')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchSubCategories() }, [])


  const toggleStatus = async (row: SubCategoryRow, nextStatus: number) => {
    const id = Number(row.id)
    if (!Number.isFinite(id) || id <= 0) {
      toast.error('Invalid subcategory id')
      return
    }
    try {
      const response = await apiService.update(API_ENDPOINTS.SUBCATEGORY, id, { category_id: row.category_id, name: row.name, slug: row.slug, status: nextStatus })
      if (response.success) {
        setSubcategories(prev => prev.map(s => s.id === id ? { ...s, status: nextStatus } : s))
        toast.success(`Status ${nextStatus === 1 ? 'activated' : 'deactivated'}`)
      } else {
        toast.error(response.error || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }


  const handleDelete = (row: SubCategoryRow) => {
    setDeletingSubCategory(row)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!deletingSubCategory) return
    const id = Number(deletingSubCategory.id)
    if (!Number.isFinite(id) || id <= 0) {
      toast.error('Invalid subcategory id')
      return
    }
    setIsDeleting(true)
    try {
      const response = await apiService.delete(API_ENDPOINTS.SUBCATEGORY, id)
      if (response.success) {
        await fetchSubCategories()
        toast.success('Subcategory deleted successfully!')
        setIsDeleteOpen(false)
        setDeletingSubCategory(null)
      } else {
        toast.error(response.error || 'Failed to delete subcategory')
      }
    } catch (error) {
      console.error('Error deleting role:', error)
      toast.error('Failed to delete role')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      <TopHeading title="Subcategories" onAddNew={() => { setEditingSubCategory(null); setIsModalOpen(true) }} addButtonText="Add Subcategory" />
      {isLoading ? (
        <div className="text-center py-10">Loading roles...</div>
      ) : (
        <CommonTable<SubCategoryRow> columns={columns} data={subcategories} itemsPerPage={10} onRefresh={fetchSubCategories} onEdit={(row) => { setEditingSubCategory(row); setIsModalOpen(true) }} onDelete={handleDelete} />
      )}
      <DeleteCommonModal
        isOpen={isDeleteOpen}
        onCancel={() => { setIsDeleteOpen(false); setDeletingSubCategory(null) }}
        onConfirm={confirmDelete}
        title={deletingSubCategory ? `Delete "${deletingSubCategory.name}"` : 'Delete Subcategory'}
        message={deletingSubCategory ? `Are you sure you want to delete "${deletingSubCategory.name}"? This action cannot be undone.` : 'Are you sure you want to delete this subcategory?'}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText='Cancel'
      />
      <AddCommonModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingSubCategory(null) }}
        title={editingSubCategory ? 'Edit Subcategory' : 'Add New Subcategory'}
      >
        <AddSubCategory
          subCategoryId={editingSubCategory?.id}
          onSuccess={() => { setIsModalOpen(false); setEditingSubCategory(null); fetchSubCategories() }}
          onCancel={() => { setIsModalOpen(false); setEditingSubCategory(null) }}
        />
      </AddCommonModal>
    </div>
  )
}

export default SubCategory
