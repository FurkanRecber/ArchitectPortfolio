import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Bold,
    Italic,
    Underline,
    List,
    Link as LinkIcon,
    Image as ImageIcon,
    Paperclip,
    Send,
    X
} from 'lucide-react';

const AdminReply: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock Data State
    const [message, setMessage] = useState<any>(null);
    const [replySubject, setReplySubject] = useState('');
    const [replyBody, setReplyBody] = useState('');

    useEffect(() => {
        // Mock Messages Database (Should ideally be shared or fetched)
        const mockMessages = [
            {
                id: 1,
                name: 'Elena Fisher',
                email: 'elena.fisher@example.com',
                avatar: 'https://source.unsplash.com/random/100x100?woman,portrait',
                subject: 'Villa Renovation in Hollywood Hills',
                content: `Hi Team,

I'm looking for an architect for a comprehensive villa renovation in the hills. We've been following your work for a while and absolutely love the minimal style you bring to residential projects. 

We are looking to start the design phase next month and would love to discuss feasibility and timelines. Our key priorities are:
• Maximizing natural light in the living area
• Sustainable material selection
• Preserving the original mid-century structure

Could we schedule a call for sometime next week?`
            },
            {
                id: 2,
                name: 'Marcus Thorne',
                email: 'marcus.thorne@example.com',
                avatar: 'https://source.unsplash.com/random/100x100?man,portrait',
                subject: 'Senior Architect Position',
                content: 'Attached is my portfolio for the Senior Architect position...'
            },
            {
                id: 3,
                name: 'Sarah Jenkins',
                email: 'sarah.jenkins@example.com',
                avatar: 'https://source.unsplash.com/random/100x100?woman,glasses',
                subject: 'Downtown Loft Project',
                content: 'Thank you for the quick response regarding the downtown loft project...'
            },
            {
                id: 4,
                name: 'David Chen',
                email: 'david.chen@example.com',
                avatar: 'https://source.unsplash.com/random/100x100?man,suit',
                subject: 'Office Space Design',
                content: 'Hello, we are planning a new office space in the financial district...'
            }
        ];

        const foundMessage = mockMessages.find(m => m.id === Number(id));

        if (foundMessage) {
            setMessage(foundMessage);
            setReplySubject(`Re: ${foundMessage.subject}`);
            setReplyBody(`Dear ${foundMessage.name.split(' ')[0]},\n\nThank you for reaching out to Vivere Design.\n\nBest regards,\nVivere Team`);
        }
    }, [id]);

    const handleSendReply = () => {
        if (!message) return;
        const mailtoLink = `mailto:${message.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;
        window.location.href = mailtoLink;
    };

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);


    const insertFormat = (format: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value; // Use textarea.value directly for most current state during event
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        let newText = text;
        let newCursorStart = start;
        let newCursorEnd = end;

        switch (format) {
            case 'bold':
                newText = `${before}**${selection}**${after}`;
                if (!selection) {
                    newCursorStart = start + 2;
                    newCursorEnd = start + 2;
                } else {
                    newCursorStart = start + 2;
                    newCursorEnd = end + 2;
                }
                break;
            case 'italic':
                newText = `${before}*${selection}*${after}`;
                if (!selection) {
                    newCursorStart = start + 1;
                    newCursorEnd = start + 1;
                } else {
                    newCursorStart = start + 1;
                    newCursorEnd = end + 1;
                }
                break;
            case 'underline':
                newText = `${before}<u>${selection}</u>${after}`;
                if (!selection) {
                    newCursorStart = start + 3;
                    newCursorEnd = start + 3;
                } else {
                    newCursorStart = start + 3;
                    newCursorEnd = end + 3;
                }
                break;
            case 'list':
                // Check if we are at the beginning of a line, if not add newline
                const prefix = (start === 0 || text[start - 1] === '\n') ? '- ' : '\n- ';
                newText = `${before}${prefix}${selection}${after}`;
                newCursorStart = start + prefix.length;
                newCursorEnd = end + prefix.length;
                break;
            case 'link':
                newText = `${before}[${selection}](url)${after}`;
                newCursorStart = start + 1;
                newCursorEnd = end + 1;
                if (!selection) {
                    // [|](url) -> Select 'url' maybe? Or just sit inside []?
                    // Let's sit inside []
                    newCursorEnd = newCursorStart;
                }
                break;
            case 'image':
                newText = `${before}![${selection}](image-url)${after}`;
                newCursorStart = start + 2;
                newCursorEnd = end + 2;
                if (!selection) {
                    newCursorEnd = newCursorStart;
                }
                break;
        }

        // Programmatically update the state
        // This is important because React's state update is async
        // We set the value directly to ensure selection range works, but also update state
        setReplyBody(newText);

        // We need to wait for React to re-render to set selection, 
        // OR we just manually set the value ref and selection now if we want it instant (but state sync is key)
        // Best approach for controlled inputs: update state, then use useEffect/layoutEffect or setTimeout to restore cursor

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorStart, newCursorEnd);
        }, 0);
    };

    if (!message) return <div className="p-8 text-zinc-500">Message not found or loading...</div>;

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-[#0B0E14] transition-colors duration-500">
            {/* Header */}
            <header className="px-8 py-6 flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/messages')}
                    className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-[#1F2430] text-zinc-500 dark:text-slate-400 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Reply to Inquiry</h1>
                    <p className="text-zinc-500 dark:text-slate-400 text-sm">Drafting response</p>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden px-8 pb-8">
                <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* Left Panel: Original Message */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-2xl p-6 flex flex-col overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <img src={message.avatar} alt={message.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">{message.name}</h3>
                                    <p className="text-xs text-zinc-500 dark:text-slate-500">{message.email}</p>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-zinc-100 dark:bg-[#1F2430] text-[10px] font-bold text-zinc-500 dark:text-slate-500 rounded uppercase tracking-wider border border-zinc-200 dark:border-[#2A303C]">
                                Original
                            </span>
                        </div>

                        <div className="space-y-1 mb-4">
                            <span className="text-xs font-bold text-zinc-500 dark:text-slate-500 uppercase">Subject</span>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{message.subject}</p>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="prose prose-sm dark:prose-invert text-zinc-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed">
                                {message.content}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Reply Editor */}
                    <div className="lg:col-span-3 bg-white dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-2xl flex flex-col overflow-hidden">

                        {/* Editor Toolbar */}
                        <div className="px-4 py-3 border-b border-zinc-200 dark:border-[#1F2430] flex items-center justify-between bg-zinc-50/50 dark:bg-[#1A1D27]/50">
                            <div className="flex items-center gap-1">
                                <ToolbarButton icon={Bold} onClick={() => insertFormat('bold')} />
                                <ToolbarButton icon={Italic} onClick={() => insertFormat('italic')} />
                                <ToolbarButton icon={Underline} onClick={() => insertFormat('underline')} />
                                <div className="w-px h-4 bg-zinc-300 dark:bg-[#2A303C] mx-2"></div>
                                <ToolbarButton icon={List} onClick={() => insertFormat('list')} />
                                <ToolbarButton icon={LinkIcon} onClick={() => insertFormat('link')} />
                                <ToolbarButton icon={ImageIcon} onClick={() => insertFormat('image')} />
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col overflow-hidden">
                            <div className="flex items-center gap-4">
                                <label className="text-sm text-zinc-500 dark:text-slate-500 w-12 pt-1">To:</label>
                                <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded bg-blue-600/10 border border-blue-600/20">
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{message.name}</span>
                                    <button className="p-0.5 hover:bg-blue-600/20 rounded text-blue-600 dark:text-blue-400 transition-colors">
                                        <X size={12} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-2 border-b border-zinc-100 dark:border-[#1F2430]">
                                <label className="text-sm text-zinc-500 dark:text-slate-500 w-12">Subject:</label>
                                <input
                                    type="text"
                                    value={replySubject}
                                    onChange={(e) => setReplySubject(e.target.value)}
                                    className="flex-1 bg-transparent text-sm font-medium text-zinc-900 dark:text-white focus:outline-none"
                                />
                            </div>

                            <textarea
                                ref={textareaRef}
                                className="flex-1 bg-transparent text-sm leading-relaxed text-zinc-900 dark:text-slate-200 placeholder-zinc-400 dark:placeholder-slate-600 resize-none focus:outline-none p-2"
                                placeholder="Type your reply here..."
                                value={replyBody}
                                onChange={(e) => setReplyBody(e.target.value)}
                            />
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-zinc-200 dark:border-[#1F2430] flex items-center justify-between bg-zinc-50/50 dark:bg-[#1A1D27]/50">
                            <button className="flex items-center gap-2 text-zinc-500 dark:text-slate-400 hover:text-zinc-800 dark:hover:text-slate-200 text-sm transition-colors">
                                <Paperclip size={16} />
                                <span>Attach Files</span>
                            </button>
                            <div className="flex items-center gap-3">
                                <button className="text-sm font-medium text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    Save Draft
                                </button>
                                <button
                                    onClick={handleSendReply}
                                    className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-600/20 group"
                                >
                                    <span>Send Reply</span>
                                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const ToolbarButton = ({ icon: Icon, onClick }: { icon: React.ElementType, onClick?: () => void }) => (
    <button
        onMouseDown={(e) => {
            e.preventDefault();
            onClick?.();
        }}
        className="p-1.5 rounded hover:bg-zinc-200 dark:hover:bg-[#1F2430] text-zinc-500 dark:text-slate-400 transition-colors"
    >
        <Icon size={16} />
    </button>
);

export default AdminReply;
