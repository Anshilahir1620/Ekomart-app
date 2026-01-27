'use client'
import { FC } from 'react'
import { X, Trash2 } from 'lucide-react'

interface DeleteCommonModalProps {
  isOpen: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

const DeleteCommonModal: FC<DeleteCommonModalProps> = ({
  isOpen,
  title = 'Delete',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#0f172a99] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold" style={{ color: '#0D150A' }}>{title}</h2>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-6 w-6" style={{ color: '#595959' }} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#FFF1F1' }}>
              <Trash2 className="h-5 w-5" style={{ color: '#FA3838' }} />
            </div>
            <p className="text-sm" style={{ color: '#595959' }}>{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-2 p-6 pt-0 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            style={{ color: '#595959' }}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-white rounded-lg font-medium transition-colors"
            style={{ backgroundColor: '#FA3838' }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteCommonModal