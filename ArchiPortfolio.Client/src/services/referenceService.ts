import axios from 'axios';

const API_URL = 'https://localhost:7179/api';

export interface Reference {
    id: number;
    title: string;
    logoUrl: string;
    order: number;
    isActive: boolean;
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const referenceService = {
    getAll: async () => {
        const response = await axios.get<Reference[]>(`${API_URL}/references`);
        return response.data;
    },

    getById: async (id: number) => {
        const response = await axios.get<Reference>(`${API_URL}/references/${id}`);
        return response.data;
    },

    add: async (formData: FormData) => {
        const response = await axios.post(`${API_URL}/references`, formData, {
            headers: {
                ...getAuthHeaders()
            }
        });
        return response.data;
    },

    update: async (id: number, formData: FormData) => {
        const response = await axios.put(`${API_URL}/references/${id}`, formData, {
            headers: {
                ...getAuthHeaders()
            }
        });
        return response.data;
    },

    delete: async (id: number) => {
        await axios.delete(`${API_URL}/references/${id}`, {
            headers: getAuthHeaders()
        });
    }
};
