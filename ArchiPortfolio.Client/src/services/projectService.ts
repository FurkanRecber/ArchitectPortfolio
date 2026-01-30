import api from './api';
import type { Project } from '../types';

export const projectService = {
    // --- OKUMA İŞLEMLERİ (MEVCUT) ---
    getAllProjects: async (lang: string = 'en'): Promise<Project[]> => {
        const response = await api.get(`/projects?lang=${lang}`);
        return response.data;
    },

    // DÜZELTME BURADA: id tipini 'number' olarak değiştirdik (veya string de gelebilir diye esnettik)
    getProjectById: async (id: number | string, lang: string = 'en'): Promise<Project> => {
        const response = await api.get(`/projects/${id}?lang=${lang}`);
        return response.data;
    },

    getFeaturedProjects: async (lang: string = 'en'): Promise<Project[]> => {
        const response = await api.get(`/projects/featured?lang=${lang}`);
        return response.data;
    },

    // --- YENİ EKLENEN YAZMA İŞLEMLERİ ---

    // 1. Proje Ekle (Resim içerdiği için FormData kullanıyoruz)
    createProject: async (formData: FormData): Promise<void> => {
        // Content-Type: multipart/form-data otomatik ayarlanır
        await api.post('/projects', formData);
    },

    // 2. Proje Güncelle
    updateProject: async (projectData: FormData): Promise<void> => {
        // ID, FormData'nın içinde olmalı. PUT isteği yapıyoruz.
        await api.put('/projects', projectData);
    },

    // 3. Proje Sil
    deleteProject: async (id: number): Promise<void> => {
        await api.delete(`/projects/${id}`);
    }
};