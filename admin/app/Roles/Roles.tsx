'use client'
import { useEffect, useState } from 'react'
import TopHeading from '../components/TopHeading'
import CommonTable from '../components/commonTable'
import { AddCommonModal } from '../components/AddCommonModal'
import DeleteCommonModal from '../components/DeleteCommonModal'
import AddRoleForm from './AddRoleForm'
import { apiService } from '../utils/apiService'
import { API_ENDPOINTS } from '../config/apiEndpoints'
import { toast } from 'react-toastify'

interface Role {
  id: number
  role_name: string
  status: number
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletingRole, setDeletingRole] = useState<Role | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'role_name', label: 'Role Name' },
    {
      key: 'status',
      label: 'Status',
      render: (value: number, row: Role) => (
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

  const fetchRoles = async () => {
    setIsLoading(true)
    try {
      const response = await apiService.getAll<Role>(API_ENDPOINTS.ROLES)
      if (response.success && response.data) {
        setRoles(response.data)
      } else {
        console.error('Failed to load roles:', response.error)
        toast.error(response.error || 'Failed to load roles')
      }
    } catch (error) {
      console.error('Error loading roles:', error)
      toast.error('Failed to load roles')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchRoles() }, [])


  const toggleStatus = async (role: Role, nextStatus: number) => {
    const id = Number(role.id)
    if (!Number.isFinite(id) || id <= 0) {
      toast.error('Invalid role id')
      return
    }
    try {
      const response = await apiService.update(API_ENDPOINTS.ROLES, id, { status: nextStatus })
      if (response.success) {
        setRoles(prev => prev.map(r => r.id === id ? { ...r, status: nextStatus } : r))
        toast.success(`Status ${nextStatus === 1 ? 'activated' : 'deactivated'}`)
      } else {
        toast.error(response.error || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }


  const handleDelete = (role: Role) => {
    setDeletingRole(role)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!deletingRole) return
    const id = Number(deletingRole.id)
    if (!Number.isFinite(id) || id <= 0) {
      toast.error('Invalid role id')
      return
    }
    setIsDeleting(true)
    try {
      const response = await apiService.delete(API_ENDPOINTS.ROLES, id)
      if (response.success) {
        await fetchRoles()
        toast.success('Role deleted successfully!')
        setIsDeleteOpen(false)
        setDeletingRole(null)
      } else {
        toast.error(response.error || 'Failed to delete role')
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
      <TopHeading title="Roles" onAddNew={() => { setEditingRole(null); setIsModalOpen(true) }} addButtonText="Add Role" />
      {isLoading ? (
        <div className="text-center py-10">Loading roles...</div>
      ) : (
        <CommonTable<Role> columns={columns} data={roles} itemsPerPage={10} onRefresh={fetchRoles} onEdit={(role) => { setEditingRole(role); setIsModalOpen(true) }} onDelete={handleDelete} />
      )}
      <DeleteCommonModal
        isOpen={isDeleteOpen}
        onCancel={() => { setIsDeleteOpen(false); setDeletingRole(null) }}
        onConfirm={confirmDelete}
        title={deletingRole ? `Delete "${deletingRole.role_name}"` : 'Delete Role'}
        message={deletingRole ? `Are you sure you want to delete "${deletingRole.role_name}"? This action cannot be undone.` : 'Are you sure you want to delete this role?'}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText='Cancel'
      />
      <AddCommonModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingRole(null) }}
        title={editingRole ? 'Edit Role' : 'Add New Role'}
      >
        <AddRoleForm
          roleId={editingRole?.id}
          onSuccess={() => { setIsModalOpen(false); setEditingRole(null); fetchRoles() }}
          onCancel={() => { setIsModalOpen(false); setEditingRole(null) }}
        />
      </AddCommonModal>
    </div>
  )
}

export default Roles