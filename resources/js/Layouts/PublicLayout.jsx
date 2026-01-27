import MainNavbar from '@/Components/MainNavbar';
import PublicFooter from '@/Components/PublicFooter';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PublicLayout({ children, title }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            {title && <Head title={title} />}
            
            <MainNavbar />
            
            <main className="flex-1">
                {children}
            </main>

            <PublicFooter />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
