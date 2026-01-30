import api from './api';

export interface Reference {
    id: number;
    title: string;
    logoUrl: string;
    order: number;
    isActive: boolean;
}

export const referenceService = {
    getAll: async () => {
        const response = await api.get<Reference[]>('/references');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<Reference>(`/references/${id}`);
        return response.data;
    },

    add: async (formData: FormData) => {
        const response = await api.post('/references', formData);
        return response.data;
    },

    update: async (id: number, formData: FormData) => {
        const response = await api.put(`/references/${id}`, formData);
        return response.data;
    },

    delete: async (id: number) => {
        await api.delete(`/references/${id}`);
    }
};
