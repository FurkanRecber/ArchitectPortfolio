import api from './api';
import type { LoginRequest, AuthResponse } from '../types';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', credentials);
        console.log("Login response:", response.data);
        const token = response.data.accessToken || response.data.AccessToken;

        if (token) {
            localStorage.setItem('token', token);
        } else {
            console.error("Token not found in response:", response.data);
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
        return !!token;
    }
};