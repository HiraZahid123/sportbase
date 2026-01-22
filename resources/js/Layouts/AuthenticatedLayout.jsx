import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white shadow-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href={route('dashboard')}>
                                    <img
                                        src="/logos.png"
                                        alt="Sportbase Logo"
                                        className="h-12 w-auto object-contain"
                                    />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                
                                {/* Admin Links */}
                                {user.role === 'super_admin' && (
                                    <NavLink href={route('admin.clubs.index')} active={route().current('admin.clubs.*')}>
                                        Clubs
                                    </NavLink>
                                )}

                                {/* Club Links */}
                                {user.role === 'club' && (
                                    <>
                                        <NavLink href={route('club.training-groups.index')} active={route().current('club.training-groups.*')}>
                                            Groups
                                        </NavLink>
                                        <NavLink href={route('club.athletes.index')} active={route().current('club.athletes.index')}>
                                            Athletes
                                        </NavLink>
                                        <NavLink href={route('club.contracts.index')} active={route().current('club.contracts.index')}>
                                            Contracts
                                        </NavLink>
                                    </>
                                )}

                                {/* Athlete Links */}
                                {user.role === 'athlete' && (
                                    <>
                                        <NavLink href={route('athlete.contracts.index')} active={route().current('athlete.contracts.index')}>
                                            Contracts
                                        </NavLink>
                                        <NavLink href={route('subscription.index')} active={route().current('subscription.index')}>
                                            Subscription
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-slate-500 bg-white hover:text-slate-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:bg-slate-100 focus:text-slate-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        
                        {user.role === 'super_admin' && (
                            <ResponsiveNavLink href={route('admin.clubs.index')} active={route().current('admin.clubs.*')}>
                                Clubs
                            </ResponsiveNavLink>
                        )}

                        {user.role === 'club' && (
                            <>
                                <ResponsiveNavLink href={route('club.training-groups.index')} active={route().current('club.training-groups.*')}>
                                    Groups
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('club.athletes.index')} active={route().current('club.athletes.index')}>
                                    Athletes
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('club.contracts.index')} active={route().current('club.contracts.index')}>
                                    Contracts
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="pt-4 pb-1 border-t border-slate-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-slate-800">{user.name}</div>
                            <div className="font-medium text-sm text-slate-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
