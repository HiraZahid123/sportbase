import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { 
    Users, 
    Calendar, 
    CreditCard, 
    CheckCircle2, 
    ArrowRight, 
    Info, 
    Phone, 
    Mail, 
    MapPin, 
    Trophy,
    ShieldCheck
} from 'lucide-react';

export default function Show({ club, groups }) {
    return (
        <GuestLayout>
            <Head title={`${club.name} - Registration Portal`} />
            
            <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
                {/* Hero / Club Info Branding */}
                <div className="relative bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-blue-100/50 border border-blue-50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500 to-blue-600 opacity-[0.03] rounded-bl-full -mr-16 -mt-16"></div>
                    
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-shrink-0">
                            {club.logo ? (
                                <img src={club.logo} alt={club.name} className="w-48 h-48 object-contain rounded-3xl shadow-lg border-2 border-slate-50" />
                            ) : (
                                <div className="w-48 h-48 bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-slate-50">
                                    <Trophy className="w-20 h-20 text-slate-300" />
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-blue/5 text-brand-blue rounded-full text-xs font-black uppercase tracking-widest border border-brand-blue/10">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Verified Sportbase Club
                            </div>
                            <h1 className="text-5xl font-black text-slate-900 leading-tight">
                                {club.name}
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                                {club.description || 'Welcome to our club! Join one of our training groups and start your sports journey with us today.'}
                            </p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4 text-sm font-bold text-slate-400">
                                {club.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {club.email}
                                    </div>
                                )}
                                {club.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {club.phone}
                                    </div>
                                )}
                                {club.address && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {club.address}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Training Groups Section */}
                <div className="space-y-10">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Available Training Groups</h2>
                        <p className="text-slate-500 max-w-xl mx-auto font-medium">Select a group below to begin your professional registration and subscription process.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {groups.map((group) => (
                            <div key={group.id} className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-blue-100/40 hover:-translate-y-2 transition-all duration-300 flex flex-col">
                                <div className="space-y-6 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="p-4 rounded-2xl bg-slate-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly Subscription</p>
                                            <p className="text-3xl font-black text-slate-900">€{group.price}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-slate-800 mb-2">{group.name}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                                            {group.description || 'Professional training sessions focused on technical development and athlete performance.'}
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Calendar className="w-4 h-4 text-brand-blue" />
                                            <span className="text-xs font-bold">
                                                {group.schedule?.length > 0 
                                                    ? `${group.schedule.length} sessions per week` 
                                                    : 'Weekly sessions provided'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <Users className="w-4 h-4 text-brand-blue" />
                                            <span className="text-xs font-bold">
                                                {group.max_members - group.current_members} spots remaining
                                            </span>
                                        </div>
                                    </div>

                                    {/* Capacity Progress Bar */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
                                            <span>Current Roster</span>
                                            <span>{Math.round((group.current_members / group.max_members) * 100)}% Full</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${group.is_full ? 'bg-red-500' : 'bg-brand-blue'}`}
                                                style={{ width: `${Math.min((group.current_members / group.max_members) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-50">
                                    <Link
                                        href={group.is_full ? '#' : route('register', { club_id: club.id, training_group_id: group.id })}
                                        disabled={group.is_full}
                                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                                            group.is_full 
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                            : 'bg-brand-blue text-white shadow-lg shadow-blue-100 hover:bg-blue-700 hover:scale-[1.02]'
                                        }`}
                                    >
                                        {group.is_full ? 'Group Full' : 'Initialize Enrollment'}
                                        {!group.is_full && <ArrowRight className="w-4 h-4" />}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust / FAQ Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-slate-100">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Easy Setup</h4>
                        <p className="text-slate-500 text-sm font-medium">Quick 5-minute digital registration process.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Secure Signing</h4>
                        <p className="text-slate-500 text-sm font-medium">Legally binding digital document management.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                            <CreditCard className="w-7 h-7" />
                        </div>
                        <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs">Direct Payments</h4>
                        <p className="text-slate-500 text-sm font-medium">Encrypted Stripe subscriptions per group.</p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
