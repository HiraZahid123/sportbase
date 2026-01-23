import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Menu, 
    X, 
    LayoutDashboard, 
    Users, 
    UsersRound, 
    FileText, 
    CreditCard, 
    User as UserIcon,
    LogOut,
    Settings,
    ChevronDown
} from 'lucide-react';
import Dropdown from '@/Components/Dropdown';

export default function MainNavbar() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: route('welcome'), show: true },
        { label: 'Dashboard', href: route('dashboard'), show: !!user, icon: LayoutDashboard },
        
        // Super Admin
        { label: 'Clubs', href: route('admin.clubs.index'), show: user?.role === 'super_admin', icon: UsersRound },
        
        // Club
        { label: 'Groups', href: route('club.training-groups.index'), show: user?.role === 'club', icon: Users },
        { label: 'Athletes', href: route('club.athletes.index'), show: user?.role === 'club', icon: UsersRound },
        { label: 'Contracts', href: route('club.contracts.index'), show: user?.role === 'club', icon: FileText },
        
        // Athlete
        { label: 'Contracts', href: route('athlete.contracts.index'), show: user?.role === 'athlete', icon: FileText },
        { label: 'Subscription', href: route('subscription.index'), show: user?.role === 'athlete', icon: CreditCard },
    ];

    const activeLinks = navLinks.filter(link => link.show);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="shrink-0 flex items-center transition-transform hover:scale-105">
                            <img
                                src="/logos.png"
                                alt="Sportbase Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:ml-10 md:flex md:items-center md:space-x-1">
                            {activeLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 group ${
                                        route().current(link.href.split('/').pop() + '*') 
                                        ? 'text-brand-blue bg-blue-50/50' 
                                        : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                                    }`}
                                >
                                    {link.icon && <link.icon className="w-4 h-4" />}
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {user ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-100">
                                            <UserIcon className="w-5 h-5" />
                                        </div>
                                        <div className="hidden lg:block text-left">
                                            <p className="text-sm font-black text-slate-800 leading-none">{user.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{user.role.replace('_', ' ')}</p>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content width="48" align="right" contentClasses="py-1 bg-white rounded-2xl shadow-xl border border-slate-100 mt-2">
                                    <div className="px-4 py-3 border-b border-slate-50 mb-1 lg:hidden">
                                        <p className="text-sm font-black text-slate-800">{user.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{user.role}</p>
                                    </div>
                                    <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-brand-blue hover:bg-blue-50/50 transition-all font-bold text-sm">
                                        <Settings className="w-4 h-4" />
                                        Account Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-brand-red hover:bg-red-50 transition-all font-bold text-sm">
                                        <LogOut className="w-4 h-4" />
                                        System Sign Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href={route('login')} className="text-slate-600 hover:text-brand-blue font-bold text-sm transition-colors">
                                    Sign In
                                </Link>
                                <Link href={route('register')} className="bg-brand-blue text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 hover:translate-y-[-2px]">
                                    Register Club
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-slate-100 bg-white"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {activeLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                        route().current(link.href.split('/').pop() + '*')
                                        ? 'text-brand-blue bg-blue-50'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.icon && <link.icon className="w-5 h-5" />}
                                    {link.label}
                                </Link>
                            ))}
                            
                            <div className="pt-4 mt-4 border-t border-slate-100">
                                {user ? (
                                    <>
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Settings className="w-5 h-5" />
                                            Profile
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-brand-red hover:bg-red-50"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Log Out
                                        </Link>
                                    </>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link href={route('login')} className="flex justify-center items-center px-4 py-3 rounded-xl text-sm font-bold text-slate-600 border border-slate-100">
                                            Log In
                                        </Link>
                                        <Link href={route('register')} className="flex justify-center items-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-brand-blue">
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
