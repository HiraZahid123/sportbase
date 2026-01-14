import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';

export default function Complete({ clubs }) {
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
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Complete Your Profile</h2>}
        >
            <Head title="Complete Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 lg:p-12">
                        <form onSubmit={submit} className="space-y-8 max-w-2xl mx-auto">
                            <div className="text-center mb-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Build Your Athlete Profile</h3>
                                <p className="text-slate-500">Provide your details to join a club and start training.</p>
                            </div>
                                <div>
                                    <InputLabel htmlFor="club_id" value="Select Club" />
                                    <select
                                        id="club_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.club_id}
                                        onChange={(e) => setData('club_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a club</option>
                                        {clubs.map(club => (
                                            <option key={club.id} value={club.id}>{club.name}</option>
                                        ))}
                                    </select>
                                    <InputError className="mt-2" message={errors.club_id} />
                                </div>

                                {data.club_id && (
                                    <div>
                                        <InputLabel htmlFor="training_group_id" value="Select Training Group" />
                                        <select
                                            id="training_group_id"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.training_group_id}
                                            onChange={(e) => setData('training_group_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select a group</option>
                                            {availableGroups.map(group => (
                                                <option key={group.id} value={group.id}>{group.name} (€{group.price}/mo)</option>
                                            ))}
                                        </select>
                                        <InputError className="mt-2" message={errors.training_group_id} />
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="phone" value="Phone Number" />
                                        <TextInput
                                            id="phone"
                                            className="mt-1 block w-full"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.phone} />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="birthday" value="Birthday" />
                                        <TextInput
                                            id="birthday"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.birthday}
                                            onChange={(e) => setData('birthday', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.birthday} />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="address" value="Address" />
                                    <textarea
                                        id="address"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.address} />
                                </div>

                                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                    <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-[0.2em] flex items-center">
                                        <span className="w-1.5 h-4 bg-indigo-400 rounded-full me-2"></span>
                                        Emergency Contact
                                    </h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="ec_name" value="Contact Name" className="text-slate-700 font-bold mb-1.5" />
                                            <TextInput
                                                id="ec_name"
                                                className="mt-1 block w-full bg-white"
                                                value={data.emergency_contact_json.name}
                                                onChange={(e) => setData('emergency_contact_json', { ...data.emergency_contact_json, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="ec_phone" value="Contact Phone" className="text-slate-700 font-bold mb-1.5" />
                                            <TextInput
                                                id="ec_phone"
                                                className="mt-1 block w-full bg-white"
                                                value={data.emergency_contact_json.phone}
                                                onChange={(e) => setData('emergency_contact_json', { ...data.emergency_contact_json, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center pt-6">
                                    <PrimaryButton className="premium-gradient text-white px-12 py-4 rounded-xl shadow-xl shadow-indigo-100 hover:opacity-90 transition-all border-0 font-bold text-base" disabled={processing}>
                                        Complete Registration
                                    </PrimaryButton>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
