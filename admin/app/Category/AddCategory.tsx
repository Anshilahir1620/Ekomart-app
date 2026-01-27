'use client'
import { FC, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { apiService } from '../utils/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';

interface FormValues {
  name: string;
  status: string;
  image?: string;
}

interface AddCategoryFormProps {
  categoryId?: number | string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Category name is required')
    .min(2, 'Category name must be at least 2 characters'),
  status: Yup.string().required('Status is required'),
});

const AddCategory: FC<AddCategoryFormProps> = ({ categoryId, onSuccess, onCancel }) => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    status: '',
    image: '',
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
    if (categoryId !== undefined && categoryId !== null) {
      const id = Number(categoryId)
      if (!Number.isFinite(id) || id <= 0) {
        toast.error('Invalid category id')
        return
      }
      fetchCategoryById(id);
      setIsEditMode(true);
    }
  }, [categoryId]);

  const fetchCategoryById = async (id: number | string) => {
    setIsLoading(true);
    try {
      const response = await apiService.getById(API_ENDPOINTS.PRODUCT_CATEGORY, id);
      if (response.success && response.data) {
        setInitialValues({
          name: response.data.name || '',
          status: response.data.status?.toString() || '',
          image: response.data.image || '',
        });
      } else {
        toast.error(response.error || 'Failed to fetch category data');
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      toast.error('Failed to fetch category data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    try {
      const normalizedSlug = String(values.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      let imageData = values.image;
      if (selectedFile) {
        const toBase64 = (f: File) => new Promise<string>((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result)); r.onerror = reject; r.readAsDataURL(f); });
        imageData = await toBase64(selectedFile);
      }

      const payload: any = {
        name: values.name,
        slug: normalizedSlug,
        status: parseInt(values.status),
      };
      if (imageData) payload.image = imageData;

      let response;

      if (isEditMode && categoryId !== undefined && categoryId !== null) {
        const id = Number(categoryId)
        if (!Number.isFinite(id) || id <= 0) {
          toast.error('Invalid category id')
          setSubmitting(false)
          return
        }
        response = await apiService.update(API_ENDPOINTS.PRODUCT_CATEGORY, id, payload);
      } else {
        response = await apiService.create(API_ENDPOINTS.PRODUCT_CATEGORY, payload);
      }

      if (response.success) {
        toast.success(`Category ${isEditMode ? 'updated' : 'created'} successfully!`);
        if (!isEditMode) {
          resetForm();
        }
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response.error || `Failed to ${isEditMode ? 'update' : 'create'} category`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} category`);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="form-container">
        <div className="text-center py-10">Loading category data...</div>
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
        {({ handleReset, isSubmitting }) => (
          <Form className="custom-form">
            <div className="form-row form-row-1">
              <div className="form-field">
                <label htmlFor="name">Category Name *</label>
                <Field type="text" id="name" name="name" placeholder="Enter category name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
            </div>
               <div className="form-row form-row-1">
                            <div className="form-field">
                                <label className="font-medium">Category Image</label>
                                <div className="mt-2 rounded-lg border border-dashed border-gray-300 p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-24 w-40 rounded bg-gray-50 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={selectedFile
                                                    ? URL.createObjectURL(selectedFile)
                                                    : (initialValues.image ? normalizeImagePath(initialValues.image) : 'https://placehold.co/240x96?text=Image')}
                                                alt={selectedFile ? 'Selected preview' : (initialValues.image ? 'Current image' : 'Placeholder')}
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
                {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : (isEditMode ? 'Update Category' : 'Submit Category')}
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

export default AddCategory;