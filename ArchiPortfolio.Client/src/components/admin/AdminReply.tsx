import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft, Bold, Italic, Underline, List,
    Paperclip, Send, X
} from 'lucide-react';
import { contactService } from '../../services/contactService';
import { translations } from '../../translations';

interface AdminReplyProps {
    language?: 'EN' | 'TR';
}

const AdminReply: React.FC<AdminReplyProps> = ({ language = 'EN' }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const t = translations[language].admin.messages.reply;

    // Referanslar
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [message, setMessage] = useState<any>(null);
    const [replySubject, setReplySubject] = useState('');
    const [loading, setLoading] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);
    const [replyHtml, setReplyHtml] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            if (!id) return;
            try {
                const data = await contactService.getMessageById(Number(id));
                setMessage({
                    id: data.id,
                    name: data.senderName || 'Unknown',
                    email: data.email,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.senderName || 'U')}&background=random`,
                    subject: data.subject || 'No Subject',
                    content: data.message || ''
                });

                setReplySubject(`Re: ${data.subject || 'Inquiry'}`);

                // DÜZELTME 1: Fazla boşluklar kaldırıldı (Tek satır haline getirildi)
                const initialTemplate = `<p>Dear ${data.senderName ? data.senderName.split(' ')[0] : 'Sir/Madam'},</p>
                <p>Thank you for reaching out to Vivere Design.</p>
                <p>Best regards,</p><p><strong>Vivere Team</strong></p>`;

                setReplyHtml(initialTemplate);

                if (editorRef.current) {
                    editorRef.current.innerHTML = initialTemplate;
                }

            } catch (err: any) {
                console.error("Hata:", err);
            }
        };
        fetchMessage();
    }, [id]);

    const handleSendReply = async () => {
        if (!message) return;
        setLoading(true);
        try {
            const finalContent = editorRef.current?.innerHTML || replyHtml;
            await contactService.replyToMessage(message.id, replySubject, finalContent);
            alert("Cevap başarıyla gönderildi!");
            navigate('/admin/messages');
        } catch (error) {
            console.error("Gönderim hatası:", error);
            alert("Mail gönderilemedi.");
        } finally {
            setLoading(false);
        }
    };

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAttachments(prev => [...prev, ...Array.from(e.target.files || [])]);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    // Formatlama
    const applyFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleToolbarClick = (action: string) => {
        switch (action) {
            case 'bold': applyFormat('bold'); break;
            case 'italic': applyFormat('italic'); break;
            case 'underline': applyFormat('underline'); break;
            case 'list': applyFormat('insertUnorderedList'); break;
            case 'link':
                const url = prompt('Link adresi:', 'https://');
                if (url) applyFormat('createLink', url);
                break;
            case 'attach':
                handleAttachClick();
                break;
        }
    };

    if (!message) return <div className="p-8 text-center text-zinc-500">Loading message details...</div>;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            <header className="px-8 py-6 flex items-center gap-4">
                <button onClick={() => navigate('/admin/messages')} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-[#1F2430] text-zinc-500">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t.title}</h1>
            </header>

            <div className="flex-1 overflow-hidden px-8 pb-8">
                <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* SOL PANEL: Gelen Mesaj */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-2xl p-6 flex flex-col h-full overflow-hidden">
                        <div className="mb-6 pb-6 border-b border-zinc-100 dark:border-[#1F2430]">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{t.originalMessage}</span>
                                <span className="text-[10px] bg-zinc-100 dark:bg-[#1A1D27] px-2 py-1 rounded text-zinc-500">INBOX</span>
                            </div>
                            <div className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{message.name}</div>
                            <div className="text-sm text-zinc-500 font-mono">{message.email}</div>
                        </div>
                        <div className="flex-1 overflow-y-auto prose prose-sm dark:prose-invert max-w-none pr-2 custom-scrollbar">
                            {message.content}
                        </div>
                    </div>

                    {/* SAĞ PANEL: Cevap Editörü */}
                    <div className="lg:col-span-3 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-2xl flex flex-col h-full overflow-hidden shadow-sm">

                        {/* Toolbar */}
                        <div className="px-4 py-3 border-b border-zinc-200 dark:border-[#1F2430] flex gap-1 bg-zinc-50/80 dark:bg-[#1A1D27]/80 backdrop-blur-sm">
                            <ToolbarButton icon={Bold} onClick={() => handleToolbarClick('bold')} title="Bold" />
                            <ToolbarButton icon={Italic} onClick={() => handleToolbarClick('italic')} title="Italic" />
                            <ToolbarButton icon={Underline} onClick={() => handleToolbarClick('underline')} title="Underline" />
                            <div className="w-px h-5 bg-zinc-300 dark:bg-[#2A303C] mx-2 self-center"></div>
                            <ToolbarButton icon={List} onClick={() => handleToolbarClick('list')} title="Bullet List" />
                            <ToolbarButton icon={Paperclip} onClick={() => handleToolbarClick('attach')} title="Attach File/Image" />
                        </div>

                        {/* Yazı Alanı */}
                        <div className="p-6 flex-1 flex flex-col gap-4 overflow-hidden">
                            <div className="flex items-center gap-4">
                                <label className="text-sm w-16 font-medium text-zinc-500">{t.to}:</label>
                                <span className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-medium">
                                    {message.email}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-[#1F2430] pb-2">
                                <label className="text-sm w-16 font-medium text-zinc-500">{t.subject}:</label>
                                <input
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    className="flex-1 bg-transparent outline-none text-sm font-semibold text-zinc-900 dark:text-white"
                                />
                            </div>

                            <div
                                ref={editorRef}
                                contentEditable
                                className="flex-1 overflow-y-auto outline-none text-sm leading-relaxed p-4 border border-zinc-200 dark:border-[#2A303C] rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-zinc-800 dark:text-slate-200 min-h-[200px] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                                style={{ whiteSpace: 'pre-wrap' }}
                                onInput={(e) => setReplyHtml(e.currentTarget.innerHTML)}
                            />

                            {/* DÜZELTME 2: Dosya ikonları temizlendi (Soldaki paperclip kaldırıldı) */}
                            {attachments.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {attachments.map((file, idx) => (
                                        <div key={idx} className="flex items-center gap-2 bg-zinc-100 dark:bg-[#1A1D27] px-3 py-1.5 rounded-lg text-xs border border-zinc-200 dark:border-[#2A303C]">
                                            {/* Paperclip ikonu buradan kaldırıldı */}
                                            <span className="max-w-[150px] truncate text-zinc-700 dark:text-slate-300 font-medium">{file.name}</span>
                                            <button onClick={() => removeAttachment(idx)} className="hover:text-red-500 transition-colors ml-1">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-zinc-200 dark:border-[#1F2430] flex justify-end items-center bg-zinc-50/50 dark:bg-[#1A1D27]/50">
                            <input
                                type="file"
                                multiple
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <button
                                onClick={handleSendReply}
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:translate-y-[-1px]"
                            >
                                <span>{loading ? t.sending : t.send}</span>
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon: Icon, onClick, title }: { icon: React.ElementType, onClick?: () => void, title?: string }) => (
    <button
        type="button"
        title={title}
        onMouseDown={(e) => {
            e.preventDefault();
            onClick?.();
        }}
        className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-[#2A303C] text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
    >
        <Icon size={18} />
    </button>
);

export default AdminReply;