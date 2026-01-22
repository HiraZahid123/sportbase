import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import ClubLayout from '@/Layouts/ClubLayout';
import { Building2, MapPin, Globe, Phone, Info, Save, CheckCircle, Link as LinkIcon, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Complete({ club, showSuccessMessage, registrationUrl }) {
    const { data, setData, post, processing, errors } = useForm({
        name: club?.name || '',
        phone: club?.phone || '',
        address: club?.address || '',
        country: club?.country || '',
        description: club?.description || '',
    });

    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        if (registrationUrl) {
            try {
                await navigator.clipboard.writeText(registrationUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy URL:', err);
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('club.register.store'));
    };

    return (
        <ClubLayout title="Complete Club Profile">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex p-4 rounded-3xl bg-blue-50 border border-blue-100 mb-6">
                        <Building2 className="w-12 h-12 text-brand-blue" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Finalize Your Club Profile</h2>
                    <p className="text-slate-500 mt-3 text-lg">Provide official details to begin your sports management journey.</p>
                </div>

                {/* Registration Success Confirmation */}
                {showSuccessMessage && club && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-green-900 mb-2">
                                    Club Registration Successful!
                                </h3>
                                <p className="text-green-800 mb-4">
                                    Welcome to SportBase! Your club "{club.name}" has been successfully registered and is ready for setup.
                                </p>
                                
                                {registrationUrl && (
                                    <div className="bg-white/60 rounded-xl p-4 space-y-3">
                                        <h4 className="font-semibold text-green-900 flex items-center gap-2">
                                            <LinkIcon className="w-4 h-4" />
                                            Your Club Registration Link
                                        </h4>
                                        <p className="text-green-700 text-sm">
                                            Share this unique link with potential athletes to let them register directly for your club:
                                        </p>
                                        <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-200">
                                            <input 
                                                type="text" 
                                                value={registrationUrl} 
                                                readOnly 
                                                className="flex-1 text-sm text-green-800 bg-transparent border-none focus:ring-0 p-0"
                                            />
                                            <button 
                                                onClick={copyToClipboard}
                                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                                                    copied 
                                                        ? 'bg-green-600 text-white' 
                                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                            >
                                                {copied ? (
                                                    <>
                                                        <CheckCircle className="w-3 h-3 inline mr-1" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3 inline mr-1" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex gap-2">
                                            <a 
                                                href={registrationUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-xs text-green-600 hover:text-green-800 underline"
                                            >
                                                Test Registration Link →
                                            </a>
                                        </div>
                                    </div>
                                )}
                                
                                <p className="text-green-700 text-sm mt-3">
                                    Complete your club profile below to activate your account and start managing athletes.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden mb-12">
                    <form onSubmit={submit} className="p-10 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <InputLabel htmlFor="name" value="Official Club Name" className="text-slate-600 font-bold" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Building2 className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full pl-10 bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3"
                                        placeholder="e.g. Royal Sport Club"
                                        required
                                    />
                                </div>
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="phone" value="Public Phone Number" className="text-slate-600 font-bold" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <TextInput
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1 block w-full pl-10 bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3"
                                        placeholder="+372 000 0000"
                                    />
                                </div>
                                <InputError message={errors.phone} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <InputLabel htmlFor="address" value="Physical Address" className="text-slate-600 font-bold" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <TextInput
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="mt-1 block w-full pl-10 bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3"
                                        placeholder="Main street 123, Tallinn"
                                    />
                                </div>
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="country" value="Registered Country" className="text-slate-600 font-bold" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Globe className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <TextInput
                                        id="country"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="mt-1 block w-full pl-10 bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3"
                                        placeholder="Estonia"
                                    />
                                </div>
                                <InputError message={errors.country} className="mt-2" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                                <InputLabel htmlFor="description" value="Club Philosophy / About" className="text-slate-600 font-bold" />
                                <div className="group cursor-help">
                                    <Info className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-blue" />
                                </div>
                            </div>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-4 min-h-[140px] transition-all"
                                placeholder="Describe your club's values, mission, and activities..."
                                rows="4"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="pt-8 border-t border-slate-50">
                            <PrimaryButton 
                                className="w-full bg-brand-blue py-5 rounded-2xl shadow-xl shadow-blue-100 flex justify-center items-center gap-3 font-black text-sm uppercase tracking-widest hover:translate-y-[-2px] transition-all" 
                                disabled={processing}
                            >
                                <Save className="w-5 h-5" />
                                Save & Proceed to Dashboard
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </ClubLayout>
    );
}
