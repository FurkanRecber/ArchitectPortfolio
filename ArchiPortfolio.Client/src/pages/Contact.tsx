import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook } from 'lucide-react';
import Footer from '../components/Footer';

const Contact: React.FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500 font-sans selection:bg-accent-600 selection:text-white">

            {/* HEADER */}
            <section className="pt-32 pb-16 px-6 md:px-16 text-center md:text-left">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Contact & Inquiries
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl"
                    >
                        We transform visionary concepts into structural realities. Connect with our team to start your journey.
                    </motion.p>
                </div>
            </section>

            {/* CONTENT GRID */}
            <section className="px-6 md:px-16 pb-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* LEFT: INFO INFO */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Email Card */}
                        <div className="p-8 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 hover:border-accent-600 transition-colors group">
                            <div className="flex items-start gap-6">
                                <div className="p-3 bg-accent-600/10 rounded text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Email</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-1">hello@studioarchi.com</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">For general and press inquiries</p>
                                </div>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="p-8 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 hover:border-accent-600 transition-colors group">
                            <div className="flex items-start gap-6">
                                <div className="p-3 bg-accent-600/10 rounded text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Phone</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-1">+1 (555) 012-3456</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Mon - Fri, 9am - 6pm EST</p>
                                </div>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="p-8 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 hover:border-accent-600 transition-colors group">
                            <div className="flex items-start gap-6">
                                <div className="p-3 bg-accent-600/10 rounded text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Studio Address</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300 font-medium mb-1">123 Architecture Lane, Floor 4</p>
                                    <p className="text-zinc-600 dark:text-zinc-300 mb-1">New York, NY 10012</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8">
                            <span className="text-xs font-bold uppercase tracking-widest block mb-6 px-1">Connect with us</span>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    <Linkedin size={20} />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    <Facebook size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="p-8 md:p-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5"
                    >
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded p-4 outline-none focus:border-accent-600 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded p-4 outline-none focus:border-accent-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Type</label>
                                    <select className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded p-4 outline-none focus:border-accent-600 transition-colors appearance-none">
                                        <option>Residential</option>
                                        <option>Commercial</option>
                                        <option>Interior</option>
                                        <option>Landscape</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Estimated Budget</label>
                                    <select className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded p-4 outline-none focus:border-accent-600 transition-colors appearance-none">
                                        <option>$50k - $100k</option>
                                        <option>$100k - $500k</option>
                                        <option>$500k+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Details</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your project..."
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded p-4 outline-none focus:border-accent-600 transition-colors resize-none"
                                />
                            </div>

                            <button type="submit" className="w-full bg-accent-600 text-white font-bold py-4 rounded hover:bg-accent-700 transition-colors flex items-center justify-center gap-2">
                                <span>Send Inquiry</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </section>

            {/* MAP SECTION */}
            <section className="px-6 md:px-16 pb-24">
                <div className="max-w-7xl mx-auto h-[400px] w-full rounded-2xl overflow-hidden relative border border-zinc-200 dark:border-white/10">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900 opacity-50 flex items-center justify-center">
                        <div className="absolute inset-0 pattern-grid-lg opacity-10"></div>
                    </div>

                    {/* Simple visual representation of a map */}
                    <img
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                        alt="Map"
                        className="w-full h-full object-cover opacity-20 dark:opacity-40 grayscale invert dark:invert-0"
                    />

                    {/* Location Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center shadow-2xl text-white mb-4 animate-bounce">
                            <MapPin size={32} />
                        </div>
                        <div className="bg-white dark:bg-zinc-900 px-6 py-4 rounded-lg shadow-xl text-center border border-zinc-200 dark:border-white/10">
                            <h4 className="font-bold text-lg mb-1">Studio Archi HQ</h4>
                            <p className="text-xs text-zinc-500 mb-2">Open Today: 09:00 - 18:00</p>
                            <a href="#" className="text-accent-600 text-xs font-bold uppercase tracking-widest hover:underline">Get Directions</a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
