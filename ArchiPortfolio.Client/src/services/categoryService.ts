import api from './api';
import type { Category } from '../types';

export const categoryService = {
    getAllCategories: async (lang: string = 'en'): Promise<Category[]> => {
        const response = await api.get(`/categories?lang=${lang}`);
        return response.data;
    },

    getCategoryById: async (id: number): Promise<Category> => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    createCategory: async (formData: FormData): Promise<void> => {
        await api.post('/categories', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    updateCategory: async (formData: FormData): Promise<void> => {
        await api.put('/categories', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    deleteCategory: async (id: number): Promise<void> => {
        await api.delete(`/categories/${id}`);
    }
};