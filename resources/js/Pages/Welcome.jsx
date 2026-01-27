import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import PublicLayout from "@/Layouts/PublicLayout";
import {
    CalendarDays,
    Users,
    Zap,
    Clock,
    LucideEuro,
    FileText,
    Star,
    Trophy,
    Target,
} from "lucide-react";

export default function Welcome({ events = [], auth }) {

    const getSportStatus = (sport) => {
        const now = new Date();
        const deadline = sport.registration_deadline
            ? new Date(sport.registration_deadline)
            : new Date(sport.starts_at);
        const capacity = sport.capacity || 0;
        const registered = sport.registered_count || 0;
        
        if (capacity > 0 && registered >= capacity) {
            return { label: "Full", color: "bg-red-500" };
        }

        if (sport.available_places <= 0)
            return { label: "Full", color: "bg-brand-red" };
        if (now > deadline)
            return { label: "Registration Closed", color: "bg-yellow-500" };
        return { label: "Open", color: "bg-brand-green" };
    };

    return (
        <PublicLayout>
            <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 font-sans">
            <Head title="Welcome" />
            <style>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: calc(200px + 100%) 0;
                    }
                }

                @keyframes gradientShift {
                    0%,
                    100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .text-gradient {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6,
                        #1d4ed8
                    );
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: gradientShift 3s ease infinite;
                    line-height: 1.2;
                    display: inline-block;
                }

                .hero-animation {
                    animation: fadeInUp 0.8s ease-out;
                }

                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }

                .slide-in-left {
                    animation: slideInLeft 0.6s ease-out;
                }

                .feature-card {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
                        0 10px 10px -5px rgb(0 0 0 / 0.04);
                    background: rgba(255, 255, 255, 0.95);
                }

                .sport-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.4s ease;
                }

                .sport-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
                    background: rgba(255, 255, 255, 1);
                }

                .shimmer-button {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6,
                        #1d4ed8
                    );
                    background-size: 200% 200%;
                    animation: gradientShift 2s ease infinite;
                    position: relative;
                    overflow: hidden;
                }

                .shimmer-button::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    animation: shimmer 2s infinite;
                }

                .progress-bar {
                    background: linear-gradient(
                        90deg,
                        #10b981,
                        #059669,
                        #047857
                    );
                    background-size: 200% 100%;
                    animation: gradientShift 3s ease infinite;
                }


                .decorative-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(40px);
                    opacity: 0.1;
                    animation: float 8s ease-in-out infinite;
                }

                .blob-1 {
                    top: 10%;
                    left: 10%;
                    width: 300px;
                    height: 300px;
                    background: linear-gradient(45deg, #3b82f6, #2563eb);
                    animation-delay: 0s;
                }

                .blob-2 {
                    top: 60%;
                    right: 10%;
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(45deg, #10b981, #059669);
                    animation-delay: 2s;
                }

                .blob-3 {
                    bottom: 20%;
                    left: 20%;
                    width: 250px;
                    height: 250px;
                    background: linear-gradient(45deg, #f59e0b, #d97706);
                    animation-delay: 4s;
                }

                .stagger-animation {
                    animation: fadeInUp 0.6s ease-out backwards;
                }

                .stagger-animation:nth-child(1) {
                    animation-delay: 0.1s;
                }
                .stagger-animation:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .stagger-animation:nth-child(3) {
                    animation-delay: 0.3s;
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="decorative-blob blob-1"></div>
                <div className="decorative-blob blob-2"></div>
                <div className="decorative-blob blob-3"></div>
            </div>

            {/* Hero Section */}
            <div className="relative max-w-7xl mx-auto px-6 py-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center">
                        <span className="block text-slate-800 hero-animation">
                            Welcome to
                        </span>
                        <img
                            src="/logos.png"
                            className="h-[2.3em] mx-auto mt-2 object-contain float-animation"
                            alt="SportBase Logo"
                        />
                    </h1>

                    <motion.p
                        className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        SportBase is your one-stop platform to{" "}
                        <span className="font-semibold text-gradient">
                            discover, register, and join
                        </span>{" "}
                        sports sports, tournaments, and training camps. Whether
                        you're an athlete looking to compete or a manager
                        managing participants, we make the process{" "}
                        <span className="font-semibold text-slate-800">
                            smooth and reliable.
                        </span>
                    </motion.p>
                </motion.div>

                {/* Enhanced Features Section */}
                <motion.div
                    className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="feature-card stagger-animation rounded-2xl p-6">
                        <div className="mb-4">
                            <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-full w-fit mx-auto mb-3">
                                <Target className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">
                                Easy Registration
                            </h3>
                        </div>
                        <p className="text-slate-600">
                            Sign up for sports in just a few clicks with our
                            streamlined process
                        </p>
                    </div>

                    <div className="feature-card stagger-animation rounded-2xl p-6">
                        <div className="mb-4">
                            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-full w-fit mx-auto mb-3">
                                <Star className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">
                                Secure Payments
                            </h3>
                        </div>
                        <p className="text-slate-600">
                            Pay safely and get instant confirmation with our
                            secure payment system
                        </p>
                    </div>

                    <div className="feature-card stagger-animation rounded-2xl p-6">
                        <div className="mb-4">
                            <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-full w-fit mx-auto mb-3">
                                <Trophy className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">
                                Live Availability
                            </h3>
                        </div>
                        <p className="text-slate-600">
                            Track remaining spots in real-time and never miss
                            your chance
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Powered by Stripe Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-6 py-4"
            >
                <div className="feature-card rounded-2xl p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Left Side - Text Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                                Secure & Trusted Payments
                            </h3>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-2">
                                All transactions are processed securely through
                                Stripe, the world's leading payment platform
                                trusted by millions.
                            </p>
                            <p className="text-slate-500 text-sm md:text-base">
                                Your payment information is encrypted and
                                protected with industry-leading security
                                standards.
                            </p>
                        </div>

                        {/* Right Side - Stripe Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/blurple.svg"
                                alt="Powered by Stripe"
                                className="h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Sports Section Header */}
            <div className="max-w-7xl mx-auto px-6 mb-8 py-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        <span className="text-gradient">Upcoming Sports</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Discover amazing sports sports, tournaments, and
                        training opportunities near you
                    </p>
                </motion.div>
            </div>

            {/* Sports Section */}
            <main className="flex-1 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    {events.length === 0 ? (
                        <motion.div
                            className="sport-card rounded-2xl p-12 text-center text-slate-500"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="float-animation">
                                <CalendarDays className="h-16 w-16 mx-auto mb-6 text-slate-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-2">
                                No sports available
                            </h3>
                            <p className="text-slate-500">
                                Check back later for exciting new sports and
                                opportunities
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((sport, index) => {
                                const status = getSportStatus(sport);
                                const registered = sport.registered_count || 0;
                                const capacity = sport.capacity || 0;

                                return (
                                    <motion.div
                                        key={sport.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.6,
                                        }}
                                        viewport={{ once: true }}
                                        className="sport-card rounded-2xl overflow-hidden"
                                    >
                                        {/* Sport Header */}
                                        <div className="bg-white/95 from-slate-50 to-blue-50 p-6 relative">
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full text-white ${status.color} shadow-lg`}
                                                >
                                                    {status.label}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-800 leading-tight mb-3 pr-20">
                                                {sport.title}
                                            </h3>

                                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                                {sport.description}
                                            </p>
                                        </div>

                                        {/* Sport Details */}
                                        <div className="p-6">
                                            <div className="space-y-4 mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-500 p-2 rounded-lg flex-shrink-0">
                                                        <CalendarDays
                                                            className="h-4 w-4 text-white"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-slate-600 font-medium">
                                                            Date
                                                        </span>
                                                        <time className="text-sm font-semibold text-slate-800">
                                                            {new Date(sport.starts_at).toLocaleDateString("en-GB")}
                                                        </time>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="bg-green-500 p-2 rounded-lg">
                                                        <LucideEuro className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-slate-600">
                                                            Price
                                                        </div>
                                                        <div className="text-sm font-semibold text-slate-800">
                                                            {sport.price ? `€${sport.price}` : "Free"}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Users className="h-4 w-4 text-slate-600" />
                                                        <span className="text-sm font-semibold text-slate-800">
                                                            {registered} / {capacity} participants
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="h-full bg-brand-blue transition-all duration-1000 ease-out"
                                                            style={{
                                                                width: `${capacity > 0 ? (registered / capacity) * 100 : 0}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link
                                                href={route("welcome")}
                                                className="w-full inline-flex items-center justify-center gap-2 shimmer-button text-white font-semibold rounded-xl px-6 py-3.5 transition-all duration-300 hover:scale-105 hover:shadow-xl relative"
                                            >
                                                <Zap className="h-5 w-5" />
                                                View Details
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
        </div>
        </PublicLayout>
    );
}
