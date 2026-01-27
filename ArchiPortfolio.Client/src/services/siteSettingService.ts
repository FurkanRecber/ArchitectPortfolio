import axios from 'axios';
import type { SiteSetting } from '../types';

const API_URL = 'https://localhost:7179/api/sitesettings';

export const siteSettingService = {
    // Dil parametresi eklendi (varsayılan 'en')
    getSettings: async (lang: string = 'en'): Promise<SiteSetting> => {
        const response = await axios.get(`${API_URL}?lang=${lang}`);
        return response.data;
    },

    updateSettings: async (settings: FormData): Promise<void> => {
        await axios.put(API_URL, settings, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};