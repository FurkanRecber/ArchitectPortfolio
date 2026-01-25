import axios from 'axios';
import type { ContactMessagePayload } from '../types';

const API_URL = 'https://localhost:7179/api/contactmessages';

export const contactService = {
    sendMessage: async (payload: ContactMessagePayload): Promise<void> => {
        await axios.post(API_URL, payload);
    },

    getAllMessages: async (): Promise<any[]> => { // Type olarak ContactMessageDto tanımlayabilirsin sonra
        const response = await axios.get(API_URL); // GET isteği
        return response.data;
    },

    markAsRead: async (id: number): Promise<void> => {
        await axios.put(`${API_URL}/${id}/read`);
    },

    getMessageById: async (id: number): Promise<any> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }
};