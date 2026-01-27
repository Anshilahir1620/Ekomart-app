import { useState } from 'react'
import { RefreshCcw, Search, ChevronLeft, ChevronRight, Edit3, Trash2 } from 'lucide-react'

interface Column<T> {
    key: keyof T
    label: string
    render?: (value: any, row: T) => React.ReactNode
}

interface CommonTableProps<T> {
    columns: Column<T>[]
    data: T[]
    onRefresh?: () => void
    itemsPerPage?: number
    onEdit?: (row: T) => void
    onDelete?: (row: T) => void
}

const CommonTable = <T extends Record<string, any>>({
    columns,
    data,
    onRefresh,
    itemsPerPage = 10,
    onEdit,
    onDelete,
}: CommonTableProps<T>) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)

    // Filter data based on search term
    const filteredData = data.filter(item =>
        columns.some(column =>
            String(item[column.key])
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    )

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    const handleRefresh = (): void => {
        setSearchTerm('')
        setCurrentPage(1)
        if (onRefresh) onRefresh()
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header Section */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between gap-4">
                    {/* Search Field */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
                            style={{ color: '#595959' }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Refresh"
                    >
                        <RefreshCcw className="h-5 w-5" style={{ color: '#595959' }} />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead style={{ backgroundColor: '#F5F5F5' }}>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className="px-6 py-3 text-left text-sm font-semibold"
                                    style={{ color: '#0D150A' }}
                                >
                                    {column.label}
                                </th>
                            ))}
                            {(onEdit || onDelete) && (
                                <th className="px-6 py-3 text-left text-sm font-semibold" style={{ color: '#0D150A' }}>
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentData.length > 0 ? (
                            currentData.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={String(column.key)}
                                            className="px-6 py-4 text-sm"
                                            style={{ color: '#595959' }}
                                        >
                                            {column.render
                                                ? column.render(row[column.key], row)
                                                : row[column.key]}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <td className="px-6 py-4 text-sm" style={{ color: '#595959' }}>
                                            <div className="flex items-center gap-2">
                                                {onEdit && (
                                                    <button
                                                        className="px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors text-[#4C7C3C]"
                                                        onClick={() => onEdit(row)}
                                                        aria-label="Edit"
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        className="px-3 py-1 rounded-lg  hover:bg-gray-100 transition-colors text-red-600"
                                                        onClick={() => onDelete(row)}
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={(onEdit || onDelete) ? columns.length + 1 : columns.length}
                                    className="px-6 py-8 text-center"
                                    style={{ color: '#595959' }}
                                >
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            {filteredData.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm" style={{ color: '#595959' }}>
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{' '}
                        {filteredData.length} entries
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="h-4 w-4" style={{ color: '#595959' }} />
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${currentPage === page
                                            ? 'text-white'
                                            : 'hover:bg-gray-100'
                                        }`}
                                    style={
                                        currentPage === page
                                            ? { backgroundColor: '#4C7C3C', color: '#FFFFFF' }
                                            : { color: '#595959' }
                                    }
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="h-4 w-4" style={{ color: '#595959' }} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommonTable
