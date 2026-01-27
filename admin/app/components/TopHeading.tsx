'use client';
import { FC } from 'react';
import { Plus } from 'lucide-react';

interface TopHeadingProps {
    title: string;
    onAddNew?: () => void;
    addButtonText?: string;
    showAddButton?: boolean;
}
const TopHeading: FC<TopHeadingProps> = ({
    title,
    onAddNew,
    addButtonText = 'Add New',
    showAddButton = true
}) => (
    <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#595959' }}>{title}</h2>

        {showAddButton && (
            <button
                onClick={onAddNew}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors font-medium"
                style={{ backgroundColor: '#4C7C3C' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D150A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4C7C3C'}
            >
                <Plus className="h-5 w-5" />
                {addButtonText}
            </button>
        )}
    </div>
);


export default TopHeading;