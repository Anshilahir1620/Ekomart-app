'use client'
import { FC, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { apiService } from '../utils/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';

interface FormValues {
  category_id: string;
  name: string;
  slug?: string;
  status: string;
}

interface AddSubCategoryFormProps {
  subCategoryId?: number | string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const validationSchema = Yup.object({
  category_id: Yup.string().required('Category is required'),
  name: Yup.string().required('Subcategory name is required').min(2),
  status: Yup.string().required('Status is required'),
});

const AddSubCategory: FC<AddSubCategoryFormProps> = ({ subCategoryId, onSuccess, onCancel }) => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    category_id: '',
    name: '',
    slug: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // load categories for select
    (async () => {
      const res = await apiService.getAll<any>(API_ENDPOINTS.PRODUCT_CATEGORY);
      if (res.success && res.data) setCategories(res.data.map((c: any) => ({ id: c.id, name: c.name })));
    })();

    if (subCategoryId !== undefined && subCategoryId !== null) {
      const id = Number(subCategoryId)
      if (!Number.isFinite(id) || id <= 0) {
        toast.error('Invalid subcategory id')
        return
      }
      fetchSubCategoryById(id);
      setIsEditMode(true);
    }
  }, [subCategoryId]);

  const fetchSubCategoryById = async (id: number | string) => {
    setIsLoading(true);
    try {
      const response = await apiService.getById(API_ENDPOINTS.SUBCATEGORY, id);
      if (response.success && response.data) {
        setInitialValues({
          category_id: String(response.data.category_id || ''),
          name: response.data.name || '',
          slug: response.data.slug || '',
          status: response.data.status?.toString() || '',
        });
      } else {
        toast.error(response.error || 'Failed to fetch subcategory data');
      }
    } catch (error) {
      console.error('Error fetching subcategory:', error);
      toast.error('Failed to fetch subcategory data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    try {
      const normalizedSlug = String(values.slug || values.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const payload: any = {
        category_id: Number(values.category_id),
        name: values.name,
        slug: normalizedSlug,
        status: parseInt(values.status),
      };

      let response;

      if (isEditMode && subCategoryId !== undefined && subCategoryId !== null) {
        const id = Number(subCategoryId)
        if (!Number.isFinite(id) || id <= 0) {
          toast.error('Invalid subcategory id')
          setSubmitting(false)
          return
        }
        response = await apiService.update(API_ENDPOINTS.SUBCATEGORY, id, payload);
      } else {
        response = await apiService.create(API_ENDPOINTS.SUBCATEGORY, payload);
      }

      if (response.success) {
        toast.success(`Subcategory ${isEditMode ? 'updated' : 'created'} successfully!`);
        if (!isEditMode) {
          resetForm();
        }
        onSuccess?.();
      } else {
        toast.error(response.error || `Failed to ${isEditMode ? 'update' : 'create'} subcategory`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} subcategory`);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="form-container">
        <div className="text-center py-10">Loading subcategory data...</div>
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
                <label htmlFor="category_id">Parent Category *</label>
                <Field as="select" id="category_id" name="category_id">
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Field>
                <ErrorMessage name="category_id" component="div" className="error-message" />
              </div>
            </div>
            <div className="form-row form-row-1">
              <div className="form-field">
                <label htmlFor="name">Subcategory Name *</label>
                <Field type="text" id="name" name="name" placeholder="Enter subcategory name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
            </div>
            <div className="form-row form-row-1">
              <div className="form-field">
                <label htmlFor="status">Status *</label>
                <Field as="select" id="status" name="status">
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Field>
                <ErrorMessage name="status" component="div" className="error-message" />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : (isEditMode ? 'Update Subcategory' : 'Submit Subcategory')}
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

export default AddSubCategory;
