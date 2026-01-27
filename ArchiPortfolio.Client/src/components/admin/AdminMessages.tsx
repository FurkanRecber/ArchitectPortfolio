import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Reply,
    Trash2,
    Mail
} from 'lucide-react';
import { contactService } from '../../services/contactService'; // Servisi import et

// Arayüz Tanımı (Component için)
export interface Message {
    id: number;
    name: string;
    avatar: string;
    type: string;
    typeColor: string;
    projectType: string;
    timestamp: string;
    subject: string;
    preview: string;
    content: string;
    status: string;
    email?: string;
    isRead?: boolean;
}

import { translations } from '../../translations';

interface AdminMessagesProps {
    language?: 'EN' | 'TR';
}


const AdminMessages: React.FC<AdminMessagesProps> = ({ language = 'EN' }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]); // Veriyi state'te tutuyoruz
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const t = translations[language].admin.messages;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await contactService.getAllMessages();

                // Backend verisini (DTO) -> Component formatına (Message) çevir
                const formattedMessages: Message[] = data.map((msg: any) => ({
                    id: msg.id,
                    name: msg.senderName || 'Unknown',
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName || 'U')}&background=random`,
                    type: 'New Inquiry',
                    typeColor: 'text-blue-500',
                    projectType: msg.projectType || 'General',
                    timestamp: new Date(msg.createdDate).toLocaleDateString() + ' ' + new Date(msg.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    subject: msg.subject || 'No Subject',
                    preview: msg.message ? msg.message.substring(0, 100) + '...' : '',
                    content: msg.message || '',
                    status: msg.isRead ? 'read' : 'unread',
                    email: msg.email,
                    isRead: msg.isRead // Ensure isRead property exists if used
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Mesajlar yüklenemedi:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    // Okundu olarak işaretle
    const handleMarkAsRead = async (id: number) => {
        try {
            await contactService.markAsRead(id);
            setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, isRead: true, status: 'read' } : msg));
        } catch (error) {
            console.error("İşlem başarısız:", error);
        }
    };

    // Silme işlemi
    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(t.confirmDelete)) {
            try {
                // Assuming deleteMessage exists in contactService
                await contactService.deleteMessage(id);
                setMessages(prev => prev.filter(msg => msg.id !== id));
            } catch (error) {
                console.error("Silme hatası:", error);
            }
        }
    };

    // Filtreleme
    const filteredMessages = messages.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (msg.email && msg.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            msg.subject.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === 'unread') return matchesSearch && !msg.isRead;
        // Important filtresi şimdilik yok
        return matchesSearch;
    });

    if (loading) return <div className="p-8 text-center text-zinc-500">{t.loading}</div>;

    return (
        <div className="flex-1 overflow-y-auto p-8 h-full bg-zinc-50 dark:bg-[#0B0E14]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{t.title}</h1>
                    <p className="text-sm text-zinc-500 dark:text-slate-400">{filteredMessages.length} {t.title.toLowerCase()}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#2A303C] rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                    />
                </div>
                <div className="flex bg-white dark:bg-[#151922] p-1 rounded-xl border border-zinc-200 dark:border-[#2A303C]">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-zinc-100 dark:bg-[#1F2430] text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white'}`}
                    >
                        {t.filter.all}
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'unread' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white'}`}
                    >
                        {t.filter.unread}
                    </button>
                    <button
                        onClick={() => setFilter('important')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'important' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' : 'text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white'}`}
                    >
                        {t.filter.important}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-[#151922] rounded-xl border border-dashed border-zinc-300 dark:border-[#2A303C]">
                        <Mail className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                        <p className="text-zinc-500">{t.empty}</p>
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => {
                                handleMarkAsRead(msg.id);
                                navigate(`/admin/messages/reply/${msg.id}`);
                            }}
                            className={`group relative bg-white dark:bg-[#151922] p-5 rounded-xl border transition-all cursor-pointer hover:shadow-md ${!msg.isRead ? 'border-blue-200 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/5' : 'border-zinc-200 dark:border-[#2A303C] hover:border-blue-300 dark:hover:border-blue-800'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    {!msg.isRead && (
                                        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse shadow-sm shadow-blue-500/50"></span>
                                    )}
                                    <h3 className={`text-base font-semibold ${!msg.isRead ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-slate-300'}`}>
                                        {msg.name}
                                    </h3>
                                    <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-[#1F2430] px-2 py-0.5 rounded-full border border-zinc-200 dark:border-[#2A303C]">{msg.email}</span>
                                </div>
                                <span className="text-xs font-medium text-zinc-400 whitespace-nowrap ml-4">
                                    {new Date(msg.timestamp).toLocaleDateString(language === 'TR' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <h4 className="text-sm font-medium text-zinc-800 dark:text-slate-200 mb-1">{msg.subject}</h4>
                            <p className="text-sm text-zinc-500 dark:text-slate-400 line-clamp-2 pr-12">{msg.content}</p>

                            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                <button
                                    onClick={(e) => handleDelete(msg.id, e)}
                                    className="p-2 bg-white dark:bg-[#1F2430] text-zinc-400 hover:text-red-500 border border-zinc-200 dark:border-[#2A303C] rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-[#2A303C] transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <button className="p-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                                    <Reply size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// Helper Components removed as they were unused

export default AdminMessages;