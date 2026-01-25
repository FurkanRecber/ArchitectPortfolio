import axios from 'axios';
import type { Category } from '../types';

const API_URL = 'https://localhost:7179/api/categories'; // Portunu kontrol et (7001 veya 5000)

export const categoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getCategoryById: async (id: number): Promise<Category> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    createCategory: async (formData: FormData): Promise<void> => {
        await axios.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    updateCategory: async (formData: FormData): Promise<void> => {
        await axios.put(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    deleteCategory: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
};