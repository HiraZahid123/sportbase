import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ clubs = [], preselectedClub = null, isClubSpecific = false, clubWelcomeMessage = null, trainingGroupId = null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'athlete',
        club_id: preselectedClub?.id || '',
        training_group_id: trainingGroupId || '',
        is_club_specific: isClubSpecific,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Club Welcome Banner for club-specific registrations */}
            {isClubSpecific && preselectedClub && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-blue-900 mb-2">
                            Join {preselectedClub.name}
                        </h2>
                        <p className="text-blue-700">
                            {clubWelcomeMessage || `You're registering for ${preselectedClub.name}. Complete the form below to get started.`}
                        </p>
                        {preselectedClub.description && (
                            <p className="text-blue-600 mt-2 text-sm">
                                {preselectedClub.description}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <form onSubmit={submit}>
                {/* System-level error messages */}
                {errors.registration && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 text-red-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Registration Error</span>
                        </div>
                        <p className="text-red-700 mt-1">{errors.registration}</p>
                    </div>
                )}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="I am registering as a..." />

                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    >
                        <option value="athlete">Athlete / Parent</option>
                        <option value="club">Sports Club / Coach</option>
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                {/* Club Selection - Only show for general registration when role is athlete */}
                {!isClubSpecific && data.role === 'athlete' && (
                    <div className="mt-4">
                        <InputLabel htmlFor="club_id" value="Select Your Club" />

                        <select
                            id="club_id"
                            name="club_id"
                            value={data.club_id}
                            className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                            onChange={(e) => setData('club_id', e.target.value)}
                            required
                        >
                            <option value="">Choose a club...</option>
                            {clubs.map(club => (
                                <option key={club.id} value={club.id}>
                                    {club.name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.club_id} className="mt-2" />
                    </div>
                )}

                {/* Hidden fields for club-specific registration */}
                {isClubSpecific && (
                    <>
                        <input type="hidden" name="club_id" value={data.club_id} />
                        <input type="hidden" name="training_group_id" value={data.training_group_id} />
                        <input type="hidden" name="is_club_specific" value={data.is_club_specific} />
                    </>
                )}

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
