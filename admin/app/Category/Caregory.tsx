'use client'
import { useEffect, useState } from 'react'
import TopHeading from '../components/TopHeading'
import CommonTable from '../components/commonTable'
import { AddCommonModal } from '../components/AddCommonModal'
import DeleteCommonModal from '../components/DeleteCommonModal'
import AddCategory from './AddCategory'
import { apiService } from '../utils/apiService'
import { API_ENDPOINTS } from '../config/apiEndpoints'
import { toast } from 'react-toastify'

interface Category {
    id: number
    name: string
    slug: string
    status: number
    image?: string
}

const Category = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const normalizeImagePath = (p: string) => {
        const raw = String(p || '').trim();
        const s = raw.replace(/\\/g, '/').replace(/^public\//, '').replace(/^public\\/, '');
        const cleaned = s.startsWith('/uploads') ? s : (s.startsWith('uploads') ? `/${s}` : s);
        if (!cleaned) return '';
        if (cleaned.startsWith('http')) return cleaned;
        return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    }

    const columns = [
        { key: 'id', label: 'ID' },
        {
            key: 'image',
            label: 'Image',
            render: (src: string, row: Category) => {
                const img = normalizeImagePath(src);
                const display = img || 'https://placehold.co/60x40?text=No+Img';
                return <img src={display} alt={row.name || 'Category'} className="h-10 w-16 object-cover rounded" onError={(e) => { const t = e.target as HTMLImageElement; t.onerror = null; t.src = 'https://placehold.co/60x40?text=No+Img'; }} />
            },
        },
        { key: 'name', label: 'Name' },
        {
            key: 'status',
            label: 'Status',
            render: (value: number, row: Category) => (
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

    const fetchCategories = async () => {
        setIsLoading(true)
        try {
            const response = await apiService.getAll<Category>(API_ENDPOINTS.PRODUCT_CATEGORY)
            if (response.success && response.data) {
                setCategories(response.data)
            } else {
                console.error('Failed to load categories:', response.error)
                toast.error(response.error || 'Failed to load categories')
            }
        } catch (error) {
            console.error('Error loading categories:', error)
            toast.error('Failed to load categories')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { fetchCategories() }, [])


    const toggleStatus = async (category: Category, nextStatus: number) => {
        const id = Number(category.id)
        if (!Number.isFinite(id) || id <= 0) {
            toast.error('Invalid category id')
            return
        }
        try {
            const response = await apiService.update(API_ENDPOINTS.PRODUCT_CATEGORY, id, { name: category.name, slug: category.slug, status: nextStatus })
            if (response.success) {
                setCategories(prev => prev.map(c => c.id === id ? { ...c, status: nextStatus } : c))
                toast.success(`Status ${nextStatus === 1 ? 'activated' : 'deactivated'}`)
            } else {
                toast.error(response.error || 'Failed to update status')
            }
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Failed to update status')
        }
    }


    const handleDelete = (category: Category) => {
        setDeletingCategory(category)
        setIsDeleteOpen(true)
    }

    const confirmDelete = async () => {
        if (!deletingCategory) return
        const id = Number(deletingCategory.id)
        if (!Number.isFinite(id) || id <= 0) {
            toast.error('Invalid category id')
            return
        }
        setIsDeleting(true)
        try {
            const response = await apiService.delete(API_ENDPOINTS.PRODUCT_CATEGORY, id)
            if (response.success) {
                await fetchCategories()
                toast.success('Category deleted successfully!')
                setIsDeleteOpen(false)
                setDeletingCategory(null)
            } else {
                toast.error(response.error || 'Failed to delete category')
            }
        } catch (error) {
            console.error('Error deleting category:', error)
            toast.error('Failed to delete category')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="space-y-4">
            <TopHeading title="Categories" onAddNew={() => { setEditingCategory(null); setIsModalOpen(true) }} addButtonText="Add Category" />
            {isLoading ? (
                <div className="text-center py-10">Loading categories...</div>
            ) : (
                <CommonTable<Category> columns={columns} data={categories} itemsPerPage={10} onRefresh={fetchCategories} onEdit={(category) => { setEditingCategory(category); setIsModalOpen(true) }} onDelete={handleDelete} />
            )}
            <DeleteCommonModal
                isOpen={isDeleteOpen}
                onCancel={() => { setIsDeleteOpen(false); setDeletingCategory(null) }}
                onConfirm={confirmDelete}
                title={deletingCategory ? `Delete \"${deletingCategory.name}\"` : 'Delete Category'}
                message={deletingCategory ? `Are you sure you want to delete \"${deletingCategory.name}\"? This action cannot be undone.` : 'Are you sure you want to delete this category?'}
                confirmText={isDeleting ? 'Deleting...' : 'Delete'}
                cancelText='Cancel'
            />
            <AddCommonModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingCategory(null) }}
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
            >
                <AddCategory
                    categoryId={editingCategory?.id}
                    onSuccess={() => { setIsModalOpen(false); setEditingCategory(null); fetchCategories() }}
                    onCancel={() => { setIsModalOpen(false); setEditingCategory(null) }}
                />
            </AddCommonModal>
        </div>
    )
}

export default Category