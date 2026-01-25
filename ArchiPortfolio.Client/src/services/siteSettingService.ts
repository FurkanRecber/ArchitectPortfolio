import axios from 'axios';
import type { SiteSetting } from '../types';

const API_URL = 'https://localhost:7179/api/sitesettings'; // Portunu kontrol et

export const siteSettingService = {
    getSettings: async (): Promise<SiteSetting> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    updateSettings: async (settings: FormData): Promise<void> => {
        await axios.put(API_URL, settings, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};