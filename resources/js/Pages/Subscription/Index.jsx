import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AthleteLayout from '@/Layouts/AthleteLayout';
import { CreditCard, CheckCircle, ShieldCheck, ArrowRight, Zap, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index({ isSubscribed, stripeKey }) {
    const { post, processing } = useForm();

    const handleCheckout = () => {
        post(route('subscription.checkout'));
    };

    return (
        <AthleteLayout title="Subscription Management">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex p-4 rounded-3xl bg-blue-50 border border-blue-100 mb-6"
                    >
                        <CreditCard className="w-12 h-12 text-brand-blue" />
                    </motion.div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Active Membership Portal</h2>
                    <p className="text-slate-500 mt-3 text-lg">Manage your secure payments and platform access.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden mb-12">
                    <div className="p-10 text-center">
                        {isSubscribed ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100 shadow-md shadow-emerald-50">
                                        <ShieldCheck className="w-16 h-16" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">Account Active</h3>
                                    <p className="text-slate-500 mt-3 max-w-md mx-auto leading-relaxed font-medium">
                                        Your subscription is currently active. You have full access to SportBase features and club training sessions.
                                    </p>
                                </div>

                                <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 inline-block">
                                    <p className="text-slate-600 font-bold mb-6">Manage your secure payment methods and billing history.</p>
                                    <a
                                        href={route('subscription.portal')}
                                        className="inline-flex items-center gap-2 px-10 py-4 bg-brand-blue text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:translate-y-[-2px] transition-all shadow-xl shadow-blue-100"
                                    >
                                        Access Billing Portal
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-10"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="p-4 rounded-full bg-blue-50 text-brand-blue mb-4 border border-blue-100">
                                        <Zap className="w-16 h-16 animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">Platform Initialization</h3>
                                    <p className="text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
                                        To start using SportBase and join your selected club, you need to activate your platform membership.
                                    </p>
                                </div>

                                <div className="p-10 bg-slate-50/50 rounded-3xl border border-slate-100 max-w-lg mx-auto">
                                    <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                        <div className="text-left">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Platform Membership</p>
                                            <p className="text-2xl font-black text-slate-800 tracking-tight">Premium Access</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-4xl font-black text-brand-blue">€5<span className="text-lg text-slate-400 font-bold">/mo</span></p>
                                        </div>
                                    </div>
                                    
                                    <PrimaryButton 
                                        onClick={handleCheckout} 
                                        disabled={processing}
                                        className="w-full bg-brand-blue py-5 rounded-2xl shadow-xl shadow-blue-100 flex justify-center items-center gap-3 font-black text-sm uppercase tracking-widest hover:translate-y-[-2px] transition-all"
                                    >
                                        {processing ? 'Connecting to Stripe...' : 'Activate Membership Now'}
                                        {!processing && <ArrowRight className="w-5 h-5" />}
                                    </PrimaryButton>
                                    
                                    <p className="text-xs text-slate-400 mt-6 font-bold flex items-center justify-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Secure payment processing via Stripe
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </AthleteLayout>
    );
}
