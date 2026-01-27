'use client'
import { FC, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { apiService } from '../utils/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';

interface FormValues {
    title: string;
    subtitle: string;
    imageUrl?: string;
}

interface AddBannersFormProps {
    bannerId?: number | string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const validationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters'),
    subtitle: Yup.string().required('Subtitle is required'),
});

const AddBanners: FC<AddBannersFormProps> = ({ bannerId, onSuccess, onCancel }) => {
    const [initialValues, setInitialValues] = useState<FormValues>({
        title: '',
        subtitle: '',
        imageUrl: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const normalizeImagePath = (p: string) => {
        const raw = String(p || '').trim();
        const s = raw.replace(/\\/g, '/').replace(/^public\//, '').replace(/^public\\/, '');
        const cleaned = s.startsWith('/uploads') ? s : (s.startsWith('uploads') ? `/${s}` : s);
        if (!cleaned) return '';
        if (cleaned.startsWith('http')) return cleaned;
        return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    };

    useEffect(() => {
        if (bannerId !== undefined && bannerId !== null) {
            const id = Number(bannerId)
            if (!Number.isFinite(id) || id <= 0) {
                toast.error('Invalid banner id')
                return
            }
            fetchBannerById(id);
            setIsEditMode(true);
        }
    }, [bannerId]);

    const fetchBannerById = async (id: number | string) => {
        setIsLoading(true);
        try {
            const response = await apiService.getById(API_ENDPOINTS.BANNERS, id);

            if (response.success && response.data) {
                setInitialValues({
                    title: response.data.title || '',
                    subtitle: response.data.subtitle || '',
                    imageUrl: response.data.image || '',
                });
            } else {
                toast.error(response.error || 'Failed to fetch banner data');
            }
        } catch (error) {
            console.error('Error fetching banner:', error);
            toast.error('Failed to fetch banner data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('subtitle', values.subtitle);
            if (selectedFile) {
                formData.append('image', selectedFile);
            } else if (isEditMode && initialValues.imageUrl) {
                formData.append('image', String(initialValues.imageUrl));
            } else if (!isEditMode) {
                toast.error('Please select an image');
                setSubmitting(false);
                return;
            }

            let response;

            if (isEditMode && bannerId !== undefined && bannerId !== null) {
                const id = Number(bannerId)
                if (!Number.isFinite(id) || id <= 0) {
                    toast.error('Invalid banner id')
                    setSubmitting(false)
                    return
                }
                response = await apiService.updateFormData(API_ENDPOINTS.BANNERS, id, formData);
            } else {
                response = await apiService.createFormData(API_ENDPOINTS.BANNERS, formData);
            }

            if (response.success) {
                toast.success(`Banner ${isEditMode ? 'updated' : 'created'} successfully!`);
                if (!isEditMode) {
                    resetForm();
                    setSelectedFile(null);
                }
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                toast.error(response.error || `Failed to ${isEditMode ? 'update' : 'create'} banner`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(`Failed to ${isEditMode ? 'update' : 'create'} banner`);
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="form-container">
                <div className="text-center py-10">Loading banner data...</div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="custom-form">
                        <div className="form-row form-row-1">
                            <div className="form-field">
                                <label htmlFor="title">Title *</label>
                                <Field type="text" id="title" name="title" placeholder="Enter title" />
                                <ErrorMessage name="title" component="div" className="error-message" />
                            </div>
                        </div>
                        <div className="form-row form-row-1">
                            <div className="form-field">
                                <label htmlFor="subtitle">Subtitle *</label>
                                <Field type="text" id="subtitle" name="subtitle" placeholder="Enter subtitle" />
                                <ErrorMessage name="subtitle" component="div" className="error-message" />
                            </div>
                        </div>
                        <div className="form-row form-row-1">
                            <div className="form-field">
                                <label className="font-medium">Banner Image</label>
                                <div className="mt-2 rounded-lg border border-dashed border-gray-300 p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-24 w-40 rounded bg-gray-50 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={selectedFile
                                                    ? URL.createObjectURL(selectedFile)
                                                    : (initialValues.imageUrl ? normalizeImagePath(initialValues.imageUrl) : 'https://placehold.co/240x96?text=Image')}
                                                alt={selectedFile ? 'Selected preview' : (initialValues.imageUrl ? 'Current image' : 'Placeholder')}
                                                className="h-full w-full object-cover"
                                                onError={(e) => { const t = e.target as HTMLImageElement; t.onerror = null; t.src = 'https://placehold.co/240x96?text=Image'; }}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm" style={{ color: '#595959' }}>PNG or JPG, max 2MB</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <input id="image" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)} className="sr-only" />
                                                <label htmlFor="image" className="px-3 py-2 rounded-md text-sm font-medium cursor-pointer" style={{ backgroundColor: '#4C7C3C', color: '#FFFFFF' }}>
                                                    {selectedFile ? 'Change Image' : 'Choose Image'}
                                                </label>
                                                {selectedFile && (
                                                    <button type="button" onClick={() => setSelectedFile(null)} className="px-3 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: '#F5F5F5', color: '#0D150A' }}>
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            {selectedFile && (
                                                <p className="mt-2 text-xs" style={{ color: '#595959' }}>{selectedFile.name}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : (isEditMode ? 'Update Banner' : 'Submit Banner')}
                            </button>
                            <button type="button" className="btn-reset" onClick={onCancel} disabled={isSubmitting}>
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddBanners;