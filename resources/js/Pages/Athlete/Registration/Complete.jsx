import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';
import AthleteLayout from '@/Layouts/AthleteLayout';
import { UserCheck, MapPin, Calendar, Phone, Heart, Info, Save, Building, Users, CheckCircle, Mail, MapPin as LocationIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Complete({ clubs, registeredClub, registrationSource, showSuccessMessage }) {
    const { data, setData, post, processing, errors } = useForm({
        club_id: '',
        training_group_id: '',
        phone: '',
        address: '',
        birthday: '',
        emergency_contact_json: {
            name: '',
            phone: '',
        },
    });

    const [availableGroups, setAvailableGroups] = useState([]);

    useEffect(() => {
        if (data.club_id) {
            const selectedClub = clubs.find(c => c.id === parseInt(data.club_id));
            setAvailableGroups(selectedClub ? selectedClub.training_groups : []);
        } else {
            setAvailableGroups([]);
        }
    }, [data.club_id]);

    const submit = (e) => {
        e.preventDefault();
        post(route('athlete.register.store'));
    };

    return (
        <AthleteLayout title="Complete Your Profile">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex p-4 rounded-3xl bg-blue-50 border border-blue-100 mb-6"
                    >
                        <UserCheck className="w-12 h-12 text-brand-blue" />
                    </motion.div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Onboarding Your Athlete Identity</h2>
                    <p className="text-slate-500 mt-3 text-lg">Finalize your connection to join a sports club and begin training.</p>
                </div>

                {/* Registration Success Confirmation */}
                {showSuccessMessage && registeredClub && (
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
                                    Registration Successful!
                                </h3>
                                <p className="text-green-800 mb-4">
                                    {registrationSource === 'club-specific' 
                                        ? `You have successfully registered for ${registeredClub.name} using their direct registration link.`
                                        : `You have successfully registered and selected ${registeredClub.name} as your club.`
                                    }
                                </p>
                                
                                <div className="bg-white/60 rounded-xl p-4 space-y-3">
                                    <h4 className="font-semibold text-green-900 flex items-center gap-2">
                                        <Building className="w-4 h-4" />
                                        Club Details
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-green-700">
                                            <span className="font-medium">Name:</span>
                                            <span>{registeredClub.name}</span>
                                        </div>
                                        {registeredClub.email && (
                                            <div className="flex items-center gap-2 text-green-700">
                                                <Mail className="w-3 h-3" />
                                                <span>{registeredClub.email}</span>
                                            </div>
                                        )}
                                        {registeredClub.phone && (
                                            <div className="flex items-center gap-2 text-green-700">
                                                <Phone className="w-3 h-3" />
                                                <span>{registeredClub.phone}</span>
                                            </div>
                                        )}
                                        {registeredClub.address && (
                                            <div className="flex items-center gap-2 text-green-700">
                                                <LocationIcon className="w-3 h-3" />
                                                <span>{registeredClub.address}</span>
                                            </div>
                                        )}
                                    </div>
                                    {registeredClub.description && (
                                        <div className="pt-2 border-t border-green-200">
                                            <p className="text-green-700 text-sm italic">
                                                "{registeredClub.description}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                <p className="text-green-700 text-sm mt-3">
                                    Complete your profile below to finalize your membership and begin training.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden mb-12">
                    <form onSubmit={submit} className="p-10 space-y-12">
                        {/* Club Connection */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                                <Building className="w-5 h-5 text-brand-blue" />
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Club Connection</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="club_id" value="Selecting Sports Club" className="text-slate-600 font-bold" />
                                    <div className="relative">
                                        <select
                                            id="club_id"
                                            className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3 pl-4 transition-all"
                                            value={data.club_id}
                                            onChange={(e) => setData('club_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Choose a club...</option>
                                            {clubs.map(club => (
                                                <option key={club.id} value={club.id}>{club.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <InputError className="mt-2" message={errors.club_id} />
                                </div>

                                {data.club_id && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-2"
                                    >
                                        <InputLabel htmlFor="training_group_id" value="Assigned Training Group" className="text-slate-600 font-bold" />
                                        <div className="relative">
                                            <select
                                                id="training_group_id"
                                                className="mt-1 block w-full bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-3 pl-4 transition-all"
                                                value={data.training_group_id}
                                                onChange={(e) => setData('training_group_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Choose a group...</option>
                                                {availableGroups.map(group => (
                                                    <option key={group.id} value={group.id}>{group.name} (€{group.price}/mo)</option>
                                                ))}
                                            </select>
                                        </div>
                                        <InputError className="mt-2" message={errors.training_group_id} />
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                                <Users className="w-5 h-5 text-brand-blue" />
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Athlete Particulars</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="phone" value="Personal Contact" className="text-slate-600 font-bold" />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <TextInput
                                            id="phone"
                                            className="mt-1 block w-full pl-10 bg-slate-50 border-slate-200 rounded-xl py-3"
                                            value={data.phone}
                                            placeholder="+372 000 0000"
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.phone} />
                                </div>
                                <div className="space-y-2">
                                    <InputLabel htmlFor="birthday" value="Date of Birth" className="text-slate-600 font-bold" />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <TextInput
                                            id="birthday"
                                            type="date"
                                            className="mt-1 block w-full pl-10 bg-slate-50 border-slate-200 rounded-xl py-3"
                                            value={data.birthday}
                                            onChange={(e) => setData('birthday', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError className="mt-2" message={errors.birthday} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="address" value="Residential Address" className="text-slate-600 font-bold" />
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pt-4 pointer-events-none">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <textarea
                                        id="address"
                                        className="mt-1 block w-full pl-10 bg-slate-50 border-slate-200 focus:border-brand-blue focus:ring-brand-blue rounded-xl py-4 min-h-[100px] transition-all"
                                        value={data.address}
                                        placeholder="Full address details..."
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                    />
                                </div>
                                <InputError className="mt-2" message={errors.address} />
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                                <Heart className="w-5 h-5 text-brand-red" />
                                <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Emergency Connection</h3>
                            </div>

                            <div className="bg-slate-50/30 p-8 rounded-3xl border border-slate-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <InputLabel htmlFor="ec_name" value="Relative Full Name" className="text-slate-600 font-bold" />
                                        <TextInput
                                            id="ec_name"
                                            className="mt-1 block w-full bg-white border-slate-200 rounded-xl py-3"
                                            value={data.emergency_contact_json.name}
                                            onChange={(e) => setData('emergency_contact_json', { ...data.emergency_contact_json, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel htmlFor="ec_phone" value="Relative Contact Num." className="text-slate-600 font-bold" />
                                        <TextInput
                                            id="ec_phone"
                                            className="mt-1 block w-full bg-white border-slate-200 rounded-xl py-3"
                                            value={data.emergency_contact_json.phone}
                                            onChange={(e) => setData('emergency_contact_json', { ...data.emergency_contact_json, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-50">
                            <PrimaryButton 
                                className="w-full bg-brand-blue py-5 rounded-2xl shadow-xl shadow-blue-100 flex justify-center items-center gap-3 font-black text-sm uppercase tracking-widest hover:translate-y-[-2px] transition-all" 
                                disabled={processing}
                            >
                                <Save className="w-5 h-5" />
                                Initialize Athlete Account
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AthleteLayout>
    );
}
