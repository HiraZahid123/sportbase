import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import ClubLayout from '@/Layouts/ClubLayout';
import { Building2, MapPin, Globe, Phone, Info, Save } from 'lucide-react';

export default function Complete({ club }) {
    const { data, setData, post, processing, errors } = useForm({
        name: club?.name || '',
        phone: club?.phone || '',
        address: club?.address || '',
        country: club?.country || '',
        description: club?.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('club.registration.complete'));
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
