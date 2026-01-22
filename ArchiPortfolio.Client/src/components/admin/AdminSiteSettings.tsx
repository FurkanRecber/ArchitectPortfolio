import React, { useState } from 'react';
import {
    UploadCloud,
    Link,
    Instagram,
    Linkedin,
    PenLine,
    CheckCircle2,
    Plus,
    Trash2,
    GripVertical
} from 'lucide-react';

const AdminSiteSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'GENERAL' },
        { id: 'hero', label: 'HERO' },
        { id: 'cta', label: 'CTA' },
        { id: 'studio', label: 'STUDIO' },
        { id: 'references', label: 'REFERENCES' },
        { id: 'contact', label: 'CONTACT' },
        { id: 'seo', label: 'SEO' }
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-500">
            {/* Header / Navigation Bar */}
            <header className="px-8 py-5 border-b border-zinc-200 dark:border-[#1F2430] bg-white dark:bg-[#0B0E14] flex items-center justify-between sticky top-0 z-10 transition-colors duration-500">
                <div className="flex items-center bg-zinc-100 dark:bg-[#151922] rounded-full p-1 border border-zinc-200 dark:border-[#1F2430]">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all ${activeTab === tab.id
                                ? 'bg-white dark:bg-[#1F2430] text-zinc-900 dark:text-white shadow-sm'
                                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-500 dark:text-zinc-500">Discard</span>
                    <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold tracking-wide transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                        Publish Changes
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="max-w-3xl mx-auto pb-20">
                    {activeTab === 'general' && <GeneralSection />}
                    {activeTab === 'hero' && <HeroSection />}
                    {activeTab === 'cta' && <CtaSection />}
                    {activeTab === 'studio' && <StudioSection />}
                    {activeTab === 'references' && <ReferencesSection />}
                    {activeTab === 'contact' && <ContactSection />}
                    {activeTab === 'seo' && <SeoSection />}
                </div>
            </div>
        </div>
    );
};

// --- Sections ---

const GeneralSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="General Information" />

        <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Brand Identity</h3>

            <div className="space-y-2">
                <Label>Site Title</Label>
                <Input defaultValue="Vivere Design Portfolio" />
            </div>

            <div className="space-y-2">
                <Label>Logo Upload</Label>
                <div className="h-40 border border-dashed border-zinc-300 dark:border-[#1F2430] bg-zinc-50 dark:bg-[#151922] rounded-lg flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-pointer group">
                    <div className="p-3 bg-white dark:bg-[#1F2430] rounded-lg mb-3 group-hover:scale-110 transition-transform shadow-sm dark:shadow-none">
                        <UploadCloud size={20} />
                    </div>
                    <span className="text-xs">Drag logo here</span>
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Footer Settings</h3>

            <div className="space-y-2">
                <Label>Copyright Text</Label>
                <Input defaultValue="© 2024 Vivere Design. All rights reserved." />
            </div>

            <div className="space-y-2">
                <Label>Footer Description</Label>
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Crafting digital spaces that inspire...</span>
                    <span className="px-3 py-1 bg-white dark:bg-[#1F2430] border border-zinc-200 dark:border-[#2A303C] rounded-full text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1.5 shadow-sm dark:shadow-none">
                        <CheckCircle2 size={10} />
                        All systems operational
                    </span>
                </div>
            </div>
        </div>
    </div>
);

const HeroSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Hero & Home" icon={true} />

        <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Main Experience</h3>

            <div className="space-y-2">
                <Label>Main Headline</Label>
                <Input defaultValue="Architecture for the Future" />
            </div>

            <div className="space-y-2">
                <Label>Sub-headline</Label>
                <div className="p-4 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg text-sm text-zinc-600 dark:text-zinc-400">
                    We design spaces that blend sustainable innovation with timeless aesthetics.
                </div>
            </div>

            <div className="space-y-2">
                <Label>Hero Image Preview</Label>
                <div className="h-48 rounded-lg overflow-hidden border border-zinc-200 dark:border-[#1F2430] relative group">
                    <img src="https://source.unsplash.com/random/800x400?architecture,modern" alt="Hero" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-4 py-2 bg-white/90 dark:bg-black/50 backdrop-blur text-zinc-900 dark:text-white text-xs rounded-lg border border-white/10 shadow-lg">Change Image</button>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label>CTA Button Text</Label>
                <Input defaultValue="View Projects" />
            </div>
        </div>
    </div>
);

const CtaSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Global CTA" icon={true} />

        <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Conversion Section</h3>

            <div className="space-y-2">
                <Label>Headline</Label>
                <Input defaultValue="Ready to Build Your Vision?" />
            </div>

            <div className="space-y-2">
                <Label>Subtext</Label>
                <div className="p-4 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg text-sm text-zinc-600 dark:text-zinc-400">
                    Let's discuss your next project and how we can help bring it to life.
                </div>
            </div>

            <div className="space-y-2">
                <Label>Button Label</Label>
                <Input defaultValue="Start a Conversation" />
            </div>
        </div>
    </div>
);

const StudioSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Studio & Files" icon={true} />

        <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Key Metrics</h3>

            <div className="grid grid-cols-3 gap-4">
                <div className="p-6 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg transition-colors duration-500">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">YEARS ACTIVE</span>
                    <span className="text-3xl font-serif text-zinc-900 dark:text-white">12</span>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg transition-colors duration-500">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">PROJECTS</span>
                    <span className="text-3xl font-serif text-zinc-900 dark:text-white">145</span>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg transition-colors duration-500">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">AWARDS</span>
                    <span className="text-3xl font-serif text-zinc-900 dark:text-white">23</span>
                </div>
            </div>

            <div className="pt-4 space-y-6">
                <h4 className="text-base text-zinc-500 dark:text-zinc-400">Assets</h4>

                <div className="space-y-2">
                    <Label>PDF Resume/CV</Label>
                    <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg transition-colors duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 rounded flex items-center justify-center">
                                <span className="text-[10px] font-bold">PDF</span>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200">Vivere_CV_2024.pdf</p>
                                <p className="text-[10px] text-zinc-500">2.4 MB • Updated 2 days ago</p>
                            </div>
                        </div>
                        <button className="px-3 py-1 bg-white dark:bg-[#1F2430] hover:bg-zinc-100 dark:hover:bg-[#2A303C] text-[10px] font-bold text-zinc-600 dark:text-zinc-300 rounded border border-zinc-200 dark:border-[#2A303C] transition-colors shadow-sm dark:shadow-none">Replace</button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Showreel Video URL</Label>
                    <Input defaultValue="https://vimeo.com/12345678" icon={Link} />
                </div>
            </div>
        </div>
    </div>
);

const ReferencesSection = () => {
    const [clients, setClients] = useState([
        { id: 1, name: 'Aesop', style: 'font-serif tracking-tight text-3xl md:text-4xl' },
        { id: 2, name: 'Herman Miller', style: 'font-sans font-bold tracking-tight uppercase text-lg md:text-xl' },
        { id: 3, name: 'Vitra.', style: 'font-serif font-bold text-2xl md:text-3xl tracking-tighter' },
        { id: 4, name: 'Bang & Olufsen', style: 'font-sans font-light tracking-[0.2em] uppercase text-xs md:text-sm' },
        { id: 5, name: 'MONOCLE', style: 'font-serif font-bold text-xl md:text-2xl tracking-wide bg-black text-white px-2 py-1 dark:bg-white dark:text-black' },
    ]);

    const handleRemove = (id: number) => {
        setClients(prev => prev.filter(c => c.id !== id));
    };

    const handleAdd = () => {
        const newId = Math.max(...clients.map(c => c.id)) + 1;
        setClients([...clients, { id: newId, name: 'New Client', style: 'font-sans text-xl' }]);
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionHeader title="Trusted References" icon={true} />

            <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-[#1F2430] pb-4">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300">Client List</h3>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                    >
                        <Plus size={14} />
                        Add Client
                    </button>
                </div>

                <div className="space-y-3">
                    {clients.map((client) => (
                        <div key={client.id} className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-xl group transition-colors">
                            <div className="text-zinc-400 cursor-grab active:cursor-grabbing hover:text-zinc-600 dark:hover:text-zinc-200">
                                <GripVertical size={16} />
                            </div>

                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Client Name</Label>
                                    <input
                                        type="text"
                                        value={client.name}
                                        onChange={(e) => {
                                            const newName = e.target.value;
                                            setClients(prev => prev.map(c => c.id === client.id ? { ...c, name: newName } : c));
                                        }}
                                        className="w-full bg-white dark:bg-[#0B0E14] border border-zinc-200 dark:border-[#2A303C] rounded px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Style Classes (Tailwind)</Label>
                                    <input
                                        type="text"
                                        value={client.style}
                                        onChange={(e) => {
                                            const newStyle = e.target.value;
                                            setClients(prev => prev.map(c => c.id === client.id ? { ...c, style: newStyle } : c));
                                        }}
                                        className="w-full bg-white dark:bg-[#0B0E14] border border-zinc-200 dark:border-[#2A303C] rounded px-3 py-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="hidden md:flex items-center justify-center w-32 h-16 bg-white dark:bg-black rounded border border-zinc-100 dark:border-[#1F2430] overflow-hidden">
                                <span className={`${client.style} origin-center scale-50 whitespace-nowrap`}>{client.name}</span>
                            </div>

                            <button
                                onClick={() => handleRemove(client.id)}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const ContactSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="Contact Info" icon={true} />

        <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Direct Contact</h3>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input defaultValue="hello@vivere.design" />
                </div>
                <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input defaultValue="+1 (555) 000-0000" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Physical Address</Label>
                <div className="p-4 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg text-sm text-zinc-600 dark:text-zinc-300 h-24">
                    123 Architecture Ave, Suite 400<br />New York, NY 10001
                </div>
            </div>

            <div className="pt-6 space-y-6">
                <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border border-zinc-100 dark:border-[#1F2430] pb-4 border-t-0 border-l-0 border-r-0">Social Media</h4>

                <div className="space-y-2">
                    <Label>Instagram</Label>
                    <Input defaultValue="instagram.com/vivere" icon={Instagram} />
                </div>
                <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input defaultValue="linkedin.com/company/vivere" icon={Linkedin} />
                </div>
                <div className="space-y-2">
                    <Label>Behance</Label>
                    <Input defaultValue="behance.net/vivere" icon={PenLine} />
                </div>
            </div>
        </div>
    </div>
);

const SeoSection = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader title="SEO & Integrations" icon={true} />

        <div className="bg-white dark:bg-[#0f1115] border border-zinc-200 dark:border-[#1F2430] rounded-xl p-8 space-y-8 shadow-sm dark:shadow-none transition-colors duration-500">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Analytics Keys</h3>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Google Analytics ID</Label>
                    <Input defaultValue="G-X123456789" />
                </div>
                <div className="space-y-2">
                    <Label>Tag Manager ID</Label>
                    <Input defaultValue="GTM-9876543" />
                </div>
            </div>

            <div className="pt-6 space-y-6">
                <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-300 border-b border-zinc-100 dark:border-[#1F2430] pb-4">Custom Code</h4>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Head Scripts</Label>
                        <span className="text-[10px] text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-500/20">INJECT &lt;HEAD&gt;</span>
                    </div>
                    <div className="h-32 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg p-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                        &lt;script&gt;<br />&nbsp;&nbsp;console.log('Custom script loaded');<br />&lt;/script&gt;
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Meta Keywords</Label>
                    <Input defaultValue="architecture, design, modern, portfolio, sustainable" />
                </div>

                <div className="space-y-2">
                    <Label>Robots.txt Content</Label>
                    <div className="h-24 bg-zinc-50 dark:bg-[#151922] border border-zinc-200 dark:border-[#1F2430] rounded-lg p-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                        User-agent: *<br />Allow: /<br />Sitemap: https://viveredesign.com/sitemap.xml
                    </div>
                </div>
            </div>
        </div>
    </div>
);


// --- Shared Components ---

const SectionHeader = ({ title, icon }: { title: string, icon?: boolean }) => (
    <div className="flex items-center gap-3 mb-6 transition-colors duration-500">
        {icon && <div className="w-5 h-5 bg-zinc-200 dark:bg-[#1F2430] rounded flex items-center justify-center text-zinc-500 dark:text-zinc-500 text-[10px] font-bold">#</div>}
        <h2 className="text-xl font-serif text-zinc-900 dark:text-white tracking-wide">{title}</h2>
    </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider block pl-1">{children}</label>
);

const Input = ({ defaultValue, icon: Icon }: { defaultValue: string, icon?: React.ElementType }) => (
    <div className="relative group transition-colors duration-500">
        {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 group-focus-within:text-zinc-800 dark:group-focus-within:text-white transition-colors">
                <Icon size={14} />
            </div>
        )}
        <input
            type="text"
            defaultValue={defaultValue}
            className={`w-full bg-zinc-50 dark:bg-[#151922] text-zinc-900 dark:text-white border border-zinc-200 dark:border-[#1F2430] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm dark:shadow-none placeholder-zinc-400 ${Icon ? 'pl-9' : ''} font-medium rounded-lg`}
        />
    </div>
);

export default AdminSiteSettings;
