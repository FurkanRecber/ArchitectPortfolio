import axios from 'axios';
import type { Project } from '../types';

// Port numaran (7179)
const API_URL = 'https://localhost:7179/api/projects';

export const projectService = {
    // --- OKUMA İŞLEMLERİ (MEVCUT) ---
    getAllProjects: async (lang: string = 'en'): Promise<Project[]> => {
        const response = await axios.get(`${API_URL}?lang=${lang}`);
        return response.data;
    },

    getProjectById: async (id: string, lang: string = 'en'): Promise<Project> => {
        const response = await axios.get(`${API_URL}/${id}?lang=${lang}`);
        return response.data;
    },

    getFeaturedProjects: async (lang: string = 'en'): Promise<Project[]> => {
        const response = await axios.get(`${API_URL}/featured?lang=${lang}`);
        return response.data;
    },

    // --- YENİ EKLENEN YAZMA İŞLEMLERİ ---

    // 1. Proje Ekle (Resim içerdiği için FormData kullanıyoruz)
    createProject: async (formData: FormData): Promise<void> => {
        // Content-Type: multipart/form-data otomatik ayarlanır
        await axios.post(API_URL, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token ekledik
            }
        });
    },

    // 2. Proje Güncelle
    updateProject: async (formData: FormData): Promise<void> => {
        await axios.put(API_URL, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },

    // 3. Proje Sil
    deleteProject: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
};