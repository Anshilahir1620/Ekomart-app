'use client'
import { FC, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { apiService } from '../utils/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';

interface FormValues {
  roleName: string;
  status: string;
}

interface AddRoleFormProps {
  roleId?: number | string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const validationSchema = Yup.object({
  roleName: Yup.string()
    .required('Role name is required')
    .min(3, 'Role name must be at least 3 characters'),
  status: Yup.string().required('Status is required'),
});

const AddRoleForm: FC<AddRoleFormProps> = ({ roleId, onSuccess, onCancel }) => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    roleName: '',
    status: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (roleId !== undefined && roleId !== null) {
      const id = Number(roleId)
      if (!Number.isFinite(id) || id <= 0) {
        toast.error('Invalid role id')
        return
      }
      fetchRoleById(id);
      setIsEditMode(true);
    }
  }, [roleId]);

  const fetchRoleById = async (id: number | string) => {
    setIsLoading(true);
    try {
      const response = await apiService.getById(API_ENDPOINTS.ROLES, id);

      if (response.success && response.data) {
        setInitialValues({
          roleName: response.data.role_name || '',
          status: response.data.status?.toString() || '',
        });
      } else {
        toast.error(response.error || 'Failed to fetch role data');
      }
    } catch (error) {
      console.error('Error fetching role:', error);
      toast.error('Failed to fetch role data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    try {
      const payload = {
        role_name: values.roleName,
        status: parseInt(values.status),
      };

      let response;

      if (isEditMode && roleId !== undefined && roleId !== null) {
        const id = Number(roleId)
        if (!Number.isFinite(id) || id <= 0) {
          toast.error('Invalid role id')
          setSubmitting(false)
          return
        }
        response = await apiService.update(API_ENDPOINTS.ROLES, id, payload);
      } else {
        response = await apiService.create(API_ENDPOINTS.ROLES, payload);
      }

      if (response.success) {
        toast.success(`Role ${isEditMode ? 'updated' : 'created'} successfully!`);
        if (!isEditMode) {
          resetForm();
        }
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response.error || `Failed to ${isEditMode ? 'update' : 'create'} role`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} role`);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="form-container">
        <div className="text-center py-10">Loading role data...</div>
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
                <label htmlFor="roleName">Role Name *</label>
                <Field type="text" id="roleName" name="roleName" placeholder="Enter role name" />
                <ErrorMessage name="roleName" component="div" className="error-message" />
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
                {isSubmitting ? (isEditMode ? 'Updating...' : 'Submitting...') : (isEditMode ? 'Update Role' : 'Submit Role')}
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

export default AddRoleForm;