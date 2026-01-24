import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Footer from '../components/Footer';
import { contactService } from '../services/contactService';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            await contactService.sendMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); // Formu temizle

            // 3 saniye sonra başarı mesajını kaldır
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-white transition-colors duration-500">

            <section className="pt-32 pb-16 px-6 md:px-16 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                >
                    Let's talk <br />
                    <span className="text-accent-600">architecture.</span>
                </motion.h1>
            </section>

            <section className="px-6 md:px-16 pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* İletişim Bilgileri */}
                <div className="space-y-12">
                    <p className="text-lg md:text-xl font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Interested in working together? We'd love to hear from you.
                        Fill out the form or reach us directly via email.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail className="text-accent-600 mt-1" />
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Email</h3>
                                <p className="text-zinc-500 dark:text-zinc-400">hello@archistudio.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin className="text-accent-600 mt-1" />
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Studio</h3>
                                <p className="text-zinc-500 dark:text-zinc-400">123 Design Avenue, Creative District<br />Istanbul, Turkey</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="text-accent-600 mt-1" />
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-widest mb-1">Phone</h3>
                                <p className="text-zinc-500 dark:text-zinc-400">+90 (212) 555 0123</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors"
                            placeholder="Project Inquiry"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                        <textarea
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded focus:outline-none focus:border-accent-600 transition-colors resize-none"
                            placeholder="Tell us about your project..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded font-bold uppercase tracking-widest hover:bg-accent-600 dark:hover:bg-accent-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        {!status.startsWith('sub') && <Send size={16} />}
                    </button>

                    {/* Durum Mesajları */}
                    {status === 'success' && (
                        <p className="text-green-600 text-center font-medium mt-4">Message sent successfully! We'll be in touch.</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-600 text-center font-medium mt-4">Failed to send message. Please try again.</p>
                    )}

                </form>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;