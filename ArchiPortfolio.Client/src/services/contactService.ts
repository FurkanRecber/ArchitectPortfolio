import api from './api';
import type { ContactMessagePayload } from '../types';

export const contactService = {
    sendMessage: async (payload: ContactMessagePayload): Promise<void> => {
        await api.post('/contactmessages', payload);
    },

    getAllMessages: async (): Promise<any[]> => {
        const response = await api.get('/contactmessages');
        return response.data;
    },

    markAsRead: async (id: number): Promise<void> => {
        await api.put(`/contactmessages/${id}/read`);
    },

    getMessageById: async (id: number): Promise<any> => {
        const response = await api.get(`/contactmessages/${id}`);
        return response.data;
    },

    replyToMessage: async (id: number, subject: string, messageBody: string): Promise<void> => {
        await api.post(`/contactmessages/${id}/reply`, { subject, messageBody });
    },

    deleteMessage: async (id: number): Promise<void> => {
        await api.delete(`/contactmessages/${id}`);
    }
};