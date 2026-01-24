import axios from 'axios';
import type { Category } from '../types';

const API_URL = 'https://localhost:7179/api/categories'; // Portunu kontrol et (7001 veya 5000)

export const categoryService = {
    getAllCategories: async (): Promise<Category[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    }
};