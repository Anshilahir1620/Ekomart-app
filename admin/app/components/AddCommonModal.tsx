'use client'
import { X } from 'lucide-react';
import { FC, useState, useEffect } from 'react';


interface FormField {
    name: string;
    label: string;
    type?: 'text' | 'email' | 'number' | 'textarea' | 'select';
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
}

interface AddCommonModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    fields?: FormField[];
    onSubmit?: (data: Record<string, any>) => void;
    submitButtonText?: string;
    initialData?: Record<string, any>;
    children?: React.ReactNode;
}

export const AddCommonModal: FC<AddCommonModalProps> = ({
    isOpen,
    onClose,
    title = 'Add New',
    fields,
    onSubmit,
    submitButtonText = 'Add',
    initialData,
    children
}) => {
    const [formData, setFormData] = useState<Record<string, any>>(initialData || {});

    useEffect(() => {
        if (isOpen) {
            setFormData(initialData || {});
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
        setFormData({});
    };

    const handleChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-[#0f172a99] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold" style={{ color: '#0D150A' }}>
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="h-6 w-6" style={{ color: '#595959' }} />
                    </button>
                </div>

                {/* Modal Body */}
                {children ? (
                    <div >{children}</div>
                ) : (
                    <form onSubmit={handleSubmit} >
                        <div className="space-y-4">
                            {fields?.map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium mb-1"
                                        style={{ color: '#0D150A' }}
                                    >
                                        {field.label}
                                        {field.required && <span style={{ color: '#FA3838' }}> *</span>}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                                            style={{ color: '#595959' }}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                            required={field.required}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                            style={{ color: '#595959' }}
                                        >
                                            <option value="">Select {field.label}</option>
                                            {field.options?.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                            style={{ color: '#595959' }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                style={{ color: '#595959' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white rounded-lg font-medium transition-colors"
                                style={{ backgroundColor: '#4C7C3C' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D150A'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4C7C3C'}
                            >
                                {submitButtonText}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
