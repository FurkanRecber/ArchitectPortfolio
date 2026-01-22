import React from 'react';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import vivereLogo from '../assets/vivere.png';
import vivereBlackLogo from '../assets/vivere_black.png';

interface AdminLoginProps {
    darkMode: boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ darkMode }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[440px] flex flex-col items-center"
            >
                {/* Login Card */}
                <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl dark:shadow-zinc-950/50 border border-zinc-100 dark:border-zinc-800/50 relative overflow-hidden">

                    {/* Decorative Background Blur */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

                    {/* Logo Section */}
                    <div className="flex flex-col items-center gap-5 mb-10 relative z-10">
                        <img
                            src={darkMode ? vivereLogo : vivereBlackLogo}
                            alt="Vivere Design"
                            className="h-12 w-auto object-contain"
                        />
                        <div className="text-center space-y-1">
                            <h1 className="text-2xl font-light text-zinc-900 dark:text-white tracking-tight">Vivere Design</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">Access Panel</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form className="w-full space-y-6 relative z-10">
                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium mb-1.5 block ml-1">Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-4 pr-10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all duration-300 text-sm"
                                    />
                                    <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium mb-1.5 block ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-4 pr-10 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all duration-300 text-sm"
                                    />
                                    <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300 transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => window.location.href = '/admin/dashboard'}
                                className="w-full py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl text-xs uppercase tracking-[0.15em] hover:opacity-90 active:scale-[0.98] transition-all duration-200 font-bold shadow-lg shadow-zinc-900/10 dark:shadow-white/10"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

            {/* Footer */}
            <div className="absolute bottom-8 text-center">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-800 uppercase tracking-[0.2em] transition-colors duration-500">Secure System v2.0</p>
            </div>
        </div>
    );
};

export default AdminLogin;
