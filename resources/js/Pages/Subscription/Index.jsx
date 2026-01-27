import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AthleteLayout from '@/Layouts/AthleteLayout';
import { CreditCard, CheckCircle, ShieldCheck, ArrowRight, Zap, ExternalLink, Info, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ subscriptions, stripeKey, enrollments }) {
    const { post, processing } = useForm();

    const handleCheckout = (enrollment) => {
        post(route('subscription.checkout', { training_group_id: enrollment.training_group_id }));
    };

    return (
        <AthleteLayout title="Subscription Management">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="text-center mb-16 space-y-4">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex p-5 rounded-[2rem] bg-brand-blue/5 border border-brand-blue/10 mb-2"
                    >
                        <CreditCard className="w-10 h-10 text-brand-blue" />
                    </motion.div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">Access & Memberships</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Manage your active training groups and secure monthly subscriptions.</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {enrollments.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-slate-100">
                            <Info className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-slate-800 mb-2">No Active Enrollments</h3>
                            <p className="text-slate-400 font-medium">You haven't joined any training groups yet.</p>
                        </div>
                    ) : (
                        enrollments.map((enrollment) => {
                            const isGroupSubscribed = enrollment.status === 'active';
                            
                            return (
                                <motion.div 
                                    key={enrollment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-300 ${
                                        isGroupSubscribed 
                                        ? 'border-emerald-100 shadow-xl shadow-emerald-50/50' 
                                        : 'border-slate-100 shadow-xl shadow-slate-100/50'
                                    }`}
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        <div className="p-10 flex-1 space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-2">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        Training Group
                                                    </div>
                                                    <h3 className="text-3xl font-black text-slate-900">{enrollment.training_group.name}</h3>
                                                </div>
                                                <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest border ${
                                                    isGroupSubscribed 
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                    {isGroupSubscribed ? (
                                                        <><ShieldCheck className="w-4 h-4" /> Active Membership</>
                                                    ) : (
                                                        <><Zap className="w-4 h-4 animate-pulse" /> Pending Payment</>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <p className="text-slate-500 font-medium leading-relaxed">
                                                        {enrollment.training_group.description || 'Access to scheduled training sessions and club facilities.'}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                                                        <Calendar className="w-4 h-4" />
                                                        Renewal Date: {enrollment.paid_until ? new Date(enrollment.paid_until).toLocaleDateString() : 'Upon activation'}
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-slate-50 rounded-3xl p-8 flex flex-col justify-center items-center md:items-end text-center md:text-right">
                                                    <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1">Monthly Billing</p>
                                                    <p className="text-4xl font-black text-brand-blue">
                                                        €{enrollment.training_group.price}
                                                        <span className="text-lg text-slate-400 font-bold ml-1">/mo</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`p-10 lg:w-80 flex flex-col gap-4 items-center justify-center ${isGroupSubscribed ? 'bg-emerald-50/30' : 'bg-slate-50/30'}`}>
                                            {isGroupSubscribed ? (
                                                <a
                                                    href={route('subscription.portal')}
                                                    className="w-full flex items-center justify-center gap-3 py-5 bg-white border-2 border-emerald-100 text-emerald-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-lg shadow-emerald-100"
                                                >
                                                    Manage Billing
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <>
                                                    <PrimaryButton 
                                                        onClick={() => handleCheckout(enrollment)} 
                                                        disabled={processing}
                                                        className="w-full bg-brand-blue py-5 rounded-2xl shadow-xl shadow-blue-100 flex justify-center items-center gap-3 font-black text-sm uppercase tracking-widest hover:translate-y-[-2px] transition-all"
                                                    >
                                                        {processing ? 'Loading...' : 'Pay & Activate'}
                                                        {!processing && <ArrowRight className="w-5 h-5" />}
                                                    </PrimaryButton>
                                                    
                                                    {/* Simulation Button for Development */}
                                                    <PrimaryButton 
                                                        onClick={() => post(route('subscription.activate', enrollment.training_group_id))}
                                                        disabled={processing}
                                                        className="w-full bg-slate-50 border-2 border-slate-200 text-slate-600 py-3 rounded-xl flex justify-center items-center gap-2 font-bold text-[10px] uppercase hover:bg-slate-100 transition-all"
                                                    >
                                                        Simulate Success
                                                    </PrimaryButton>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>

                <div className="mt-16 flex justify-center">
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-slate-100 shadow-sm">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secure 256-bit SSL encrypted payments via Stripe</p>
                    </div>
                </div>
            </div>
        </AthleteLayout>
    );
}
