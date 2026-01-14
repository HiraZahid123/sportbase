import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

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
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Complete Club Profile</h2>}
        >
            <Head title="Complete Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white glass-morphism overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8 lg:p-12">
                        <div className="text-center mb-10 max-w-xl">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Complete Club Profile</h3>
                            <p className="text-slate-500">Provide official details for your club to start managing athletes and training groups.</p>
                        </div>
                        <form onSubmit={submit} className="space-y-6 max-w-xl">
                            <div>
                                <InputLabel htmlFor="name" value="Club Name" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone Number" />
                                <TextInput
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="address" value="Address" />
                                <TextInput
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="country" value="Country" />
                                <TextInput
                                    id="country"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.country} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="About the Club" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    rows="4"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex items-center gap-4 pt-6">
                                <PrimaryButton className="premium-gradient text-white px-8 py-3 rounded-xl shadow-lg shadow-indigo-100 hover:opacity-90 transition-all border-0 font-bold" disabled={processing}>Save Club Profile</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
