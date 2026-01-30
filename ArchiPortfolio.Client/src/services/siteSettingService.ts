import api from './api';
import type { SiteSetting } from '../types';

export const siteSettingService = {
    // Dil parametresi eklendi (varsayılan 'en')
    getSettings: async (lang: string = 'en'): Promise<SiteSetting> => {
        const response = await api.get(`/sitesettings?lang=${lang}`);
        return response.data;
    },

    updateSettings: async (settings: FormData): Promise<void> => {
        await api.put('/sitesettings', settings, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};