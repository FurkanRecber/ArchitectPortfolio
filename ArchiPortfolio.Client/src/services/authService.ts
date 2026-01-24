import axios from 'axios';
import type { LoginRequest, AuthResponse } from '../types';

const API_URL = 'https://localhost:7179/api/auth'; // Portunu kontrol et

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        // Burada token süresi dolmuş mu kontrolü de yapılabilir (JWT decode ile)
        // Şimdilik sadece token var mı diye bakıyoruz.
        return !!token;
    }
};