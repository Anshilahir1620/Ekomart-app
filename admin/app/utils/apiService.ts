

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getAll<T>(endpoint: string): Promise<ApiResponse<T[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'GET',
        cache: 'no-store',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      };
    }
  }

  async getById<T>(endpoint: string, id: number | string): Promise<ApiResponse<T>> {
    try {
      const safeId = encodeURIComponent(String(id))
      const response = await fetch(`${this.baseUrl}/${endpoint}/${safeId}`, {
        method: 'GET',
        cache: 'no-store',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      };
    }
  }

  async create<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create data',
      };
    }
  }

  async createFormData<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create data',
      };
    }
  }

  async update<T>(endpoint: string, id: number | string, data: any): Promise<ApiResponse<T>> {
    try {
      const safeId = encodeURIComponent(String(id))
      const response = await fetch(`${this.baseUrl}/${endpoint}/${safeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update data',
      };
    }
  }

  async updateFormData<T>(endpoint: string, id: number | string, formData: FormData): Promise<ApiResponse<T>> {
    try {
      const safeId = encodeURIComponent(String(id))
      const response = await fetch(`${this.baseUrl}/${endpoint}/${safeId}`, {
        method: 'PUT',
        body: formData,
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update data',
      };
    }
  }

  async delete<T>(endpoint: string, id: number | string): Promise<ApiResponse<T>> {
    try {
      const safeId = encodeURIComponent(String(id))
      const response = await fetch(`${this.baseUrl}/${endpoint}/${safeId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete data',
      };
    }
  }

  async patch<T>(endpoint: string, id: number | string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to patch data',
      };
    }
  }
}

export const apiService = new ApiService();
export default ApiService;