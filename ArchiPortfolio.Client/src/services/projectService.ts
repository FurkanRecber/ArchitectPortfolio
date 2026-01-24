import axios from 'axios';
import type { Project } from '../types';

// Backend adresin (launchSettings.json'daki adres)
// Genelde: http://localhost:5000 veya https://localhost:7001
// Burayı kendi çalışan portuna göre güncellemelisin.
const API_URL = 'https://localhost:7179/api/projects';

export const projectService = {
    // 1. Tüm Projeleri Getir
    getAllProjects: async (lang: string = 'en'): Promise<Project[]> => {
        const response = await axios.get(`${API_URL}?lang=${lang}`);
        return response.data;
    },

    // 2. ID'ye göre Proje Getir
    getProjectById: async (id: string, lang: string = 'en'): Promise<Project> => {
        const response = await axios.get(`${API_URL}/${id}?lang=${lang}`);
        return response.data;
    },

    // 3. Öne Çıkanları Getir
    getFeaturedProjects: async (lang: string = 'en'): Promise<Project[]> => {
        const response = await axios.get(`${API_URL}/featured?lang=${lang}`);
        return response.data;
    }
};