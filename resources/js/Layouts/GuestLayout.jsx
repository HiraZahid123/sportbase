import PublicHeader from '@/Components/PublicHeader';
import PublicFooter from '@/Components/PublicFooter';
import { Head } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <PublicHeader />
            
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
                <div className="w-full sm:max-w-md bg-white px-8 py-8 shadow-xl rounded-2xl border border-blue-100/50">
                    {children}
                </div>
            </div>

            <PublicFooter />
        </div>
    );
}
