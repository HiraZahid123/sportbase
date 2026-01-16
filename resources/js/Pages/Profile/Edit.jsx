import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import ClubLayout from '@/Layouts/ClubLayout';
import AthleteLayout from '@/Layouts/AthleteLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UserCircle, Shield, Trash2, Settings } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    const ProfileContent = () => (
        <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-brand-blue rounded-2xl shadow-lg shadow-blue-100">
                    <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Account Configuration</h2>
                    <p className="text-slate-500 font-medium">Manage your personal identity and platform security</p>
                </div>
            </div>

            <div className="space-y-10">
                <section className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/20 flex items-center gap-3">
                        <UserCircle className="w-5 h-5 text-brand-blue" />
                        <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Profile Information</h3>
                    </div>
                    <div className="p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                </section>

                <section className="bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/20 flex items-center gap-3">
                        <Shield className="w-5 h-5 text-amber-500" />
                        <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Security & Password</h3>
                    </div>
                    <div className="p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </section>

                <section className="bg-white/50 rounded-3xl border border-red-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-red-50 bg-red-50/10 flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-brand-red" />
                        <h3 className="font-black text-brand-red uppercase tracking-widest text-xs">Danger Zone</h3>
                    </div>
                    <div className="p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </section>
            </div>
        </div>
    );

    if (role === 'club') {
        return (
            <ClubLayout title="Profile">
                <ProfileContent />
            </ClubLayout>
        );
    }

    if (role === 'athlete') {
        return (
            <AthleteLayout title="Profile">
                <ProfileContent />
            </AthleteLayout>
        );
    }

    // Default or Admin
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />
            <div className="py-12">
                <ProfileContent />
            </div>
        </AuthenticatedLayout>
    );
}
