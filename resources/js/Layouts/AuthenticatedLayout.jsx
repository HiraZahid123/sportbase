import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainNavbar from '@/Components/MainNavbar';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    
    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="min-h-screen bg-slate-50">
            <MainNavbar />

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
