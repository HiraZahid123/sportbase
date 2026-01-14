import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to SportBase" />
            <div className="min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white font-[Outfit]">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-white">
                    <div className="absolute top-0 left-0 w-full h-full premium-gradient opacity-5 -skew-y-6 transform origin-top-left"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <nav className="flex justify-between items-center py-8">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                    <span className="text-white font-bold text-xl">S</span>
                                </div>
                                <span className="text-2xl font-bold text-slate-900 tracking-tight">SportBase</span>
                            </div>
                            <div className="flex gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-slate-600 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="premium-gradient text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:opacity-90 transition-all"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>

                        <div className="py-24 lg:py-32 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                                    Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Sports Empire</span> with Ease.
                                </h1>
                                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                                    The all-in-one platform for clubs and athletes. Manage training groups, automate subscriptions, and streamline contract signing in one premium workspace.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                                    >
                                        Register Your Club
                                    </Link>
                                    <div className="flex items-center gap-4 px-8 py-4 bg-white border border-slate-200 rounded-2xl">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-slate-600 font-medium text-sm">Joined by 500+ Clubs</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100">
                                    <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                        </div>
                                        <div className="ml-4 h-6 bg-white border border-slate-200 rounded-lg w-1/2"></div>
                                    </div>
                                    <div className="p-8">
                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            {[1,2,3,4].map(i => (
                                                <div key={i} className="h-24 rounded-2xl bg-slate-50 animate-pulse border border-slate-100"></div>
                                            ))}
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-4 bg-slate-50 rounded-full w-3/4"></div>
                                            <div className="h-4 bg-slate-50 rounded-full w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Smart Scheduling", desc: "Interactive training group management with JSON-based schedules.", icon: "📅" },
                            { title: "Automated Billing", desc: "Recurring Stripe subscriptions for both clubs and athletes.", icon: "💳" },
                            { title: "Contract Hub", desc: "Upload templates and signed contracts with real-time tracking.", icon: "✍️" }
                        ].map((f, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all card-hover group">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-6 h-6 premium-gradient rounded-md"></div>
                            <span className="font-bold text-slate-900">SportBase</span>
                        </div>
                        <p className="text-slate-500 text-sm">
                            © 2026 SportBase. All rights reserved. Built with Laravel and React.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
