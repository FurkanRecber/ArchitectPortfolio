import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    ChevronDown,
    Reply,
    Archive,
    Trash2,
    ArrowDown
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
}

const AdminMessages: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]); // Veriyi state'te tutuyoruz
    const [activeMessageId, setActiveMessageId] = useState<number | null>(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(5);

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
                    email: msg.email
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
    const toggleMessage = async (id: number) => {
        if (activeMessageId === id) {
            setActiveMessageId(null);
        } else {
            setActiveMessageId(id);

            // Eğer mesaj okunmamışsa Backend'e bildir
            const msg = messages.find(m => m.id === id);
            if (msg && msg.status === 'unread') {
                try {
                    // Servis dosyanı güncellemen gerekebilir: markAsRead metodu lazım
                    await contactService.markAsRead(id);

                    // State'i güncelle
                    setMessages(prev => prev.map(m =>
                        m.id === id ? { ...m, status: 'read' } : m
                    ));
                } catch (err) {
                    console.error(err);
                }
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Mesajı silmek istediğinize emin misiniz?")) {
            try {
                // await contactService.deleteMessage(id); // Delete metodu varsa
                setMessages(prev => prev.filter(m => m.id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    }

    const filteredMessages = messages.filter(msg => {
        // 1. Tab Filter
        let matchesTab = false;
        if (filter === 'all') matchesTab = msg.status !== 'archived';
        else if (filter === 'unread') matchesTab = msg.status === 'unread';
        else if (filter === 'archived') matchesTab = msg.status === 'archived';

        if (!matchesTab) return false;

        // 2. Search Filter
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            msg.name.toLowerCase().includes(query) ||
            msg.subject.toLowerCase().includes(query) ||
            msg.projectType.toLowerCase().includes(query) ||
            msg.preview.toLowerCase().includes(query)
        );
    });

    if (loading) return <div className="p-8 text-center text-zinc-500">Loading messages...</div>;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <div className="p-8 pb-0">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-2">INQUIRIES</h1>
                <p className="text-zinc-500 dark:text-slate-400">Manage your incoming project requests and messages.</p>
            </div>

            {/* Toolbar */}
            <div className="px-8 py-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search by sender, keyword or project type..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setVisibleCount(5);
                            }}
                            className="w-full bg-zinc-100 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-slate-200 focus:outline-none focus:border-zinc-300 dark:focus:border-[#2A303C] placeholder-zinc-400 dark:placeholder-slate-600"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center bg-zinc-100 dark:bg-[#151922] rounded-lg p-1 border border-zinc-200 dark:border-[#1F2430]">
                        <FilterTab label="All Messages" active={filter === 'all'} onClick={() => { setFilter('all'); setVisibleCount(5); }} />
                        <FilterTab label="Unread" count={messages.filter(m => m.status === 'unread').length} active={filter === 'unread'} onClick={() => { setFilter('unread'); setVisibleCount(5); }} />
                        <FilterTab label="Archived" active={filter === 'archived'} onClick={() => { setFilter('archived'); setVisibleCount(5); }} />
                    </div>
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-4">
                {filteredMessages.length === 0 ? (
                    <div className="text-center py-10 text-zinc-400">No messages found.</div>
                ) : (
                    filteredMessages.slice(0, visibleCount).map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-white dark:bg-[#151922] border rounded-2xl transition-all duration-300 overflow-hidden ${activeMessageId === msg.id
                                ? 'border-blue-500/30 shadow-lg shadow-blue-500/5'
                                : 'border-zinc-200 dark:border-[#1F2430] hover:border-zinc-300 dark:hover:border-[#2A303C]'
                                }`}
                        >
                            {/* Message Header / Summary */}
                            <div
                                className="p-4 flex items-center gap-4 cursor-pointer"
                                onClick={() => toggleMessage(msg.id)}
                            >
                                <div className="relative">
                                    <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-[#1F2430]" />
                                    {msg.status === 'unread' && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white dark:border-[#151922] rounded-full"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    <div className="col-span-3">
                                        <h3 className="font-semibold text-zinc-900 dark:text-white truncate">{msg.name}</h3>
                                    </div>

                                    <div className="col-span-8">
                                        {activeMessageId !== msg.id && (
                                            <p className="text-sm text-zinc-500 dark:text-slate-500 truncate">{msg.preview}</p>
                                        )}
                                    </div>

                                    <div className="col-span-1 text-right">
                                        <span className="text-xs text-zinc-400 dark:text-slate-500 whitespace-nowrap">{msg.timestamp}</span>
                                    </div>
                                </div>

                                <div className="ml-2 text-zinc-400">
                                    <ChevronDown size={20} className={`transition-transform duration-300 ${activeMessageId === msg.id ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {activeMessageId === msg.id && (
                                <div className="px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="border-t border-zinc-100 dark:border-[#1F2430] pt-6 mb-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{msg.subject}</h2>
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-[#1f2430] rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-slate-300 transition-colors" title="Archive">
                                                    <Archive size={18} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                            {msg.content}
                                        </div>
                                        {msg.email && (
                                            <div className="mt-4 text-sm text-zinc-400">
                                                Reply to: <a href={`mailto:${msg.email}`} className="text-blue-500 hover:underline">{msg.email}</a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => navigate(`/admin/messages/reply/${msg.id}`)}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
                                        >
                                            <Reply size={16} />
                                            <span>Reply to {msg.name.split(' ')[0]}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )))}

                <div className="flex justify-center py-4">
                    {filteredMessages.length > visibleCount && (
                        <button
                            onClick={() => setVisibleCount(prev => prev + 5)}
                            className="flex items-center gap-2 text-sm text-zinc-500 dark:text-slate-500 hover:text-zinc-800 dark:hover:text-slate-300 transition-colors"
                        >
                            <span>Load more messages</span>
                            <ArrowDown size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper Components
const FilterTab = ({ label, count, active, onClick }: { label: string, count?: number, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all relative ${active
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
    >
        {label}
        {count !== undefined && count > 0 && (
            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-zinc-200 dark:bg-[#2A303C] text-zinc-600 dark:text-slate-400'
                }`}>
                {count}
            </span>
        )}
    </button>
);

export default AdminMessages;