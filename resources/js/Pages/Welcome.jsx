import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Calendar, 
    FileText, 
    TrendingUp, 
    Shield, 
    Zap,
    CheckCircle,
    ArrowRight,
    Star,
    Globe,
    Award,
    Target
} from 'lucide-react';
import { useState, useEffect } from 'react';

const StatCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

export default function Welcome({ auth }) {
    const features = [
        {
            icon: Users,
            title: "Club Management",
            description: "Manage your entire sports club from one centralized dashboard with ease and efficiency.",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Calendar,
            title: "Training Groups",
            description: "Create and organize training groups with flexible scheduling and member management.",
            color: "bg-orange-50 text-orange-600"
        },
        {
            icon: FileText,
            title: "Smart Contracts",
            description: "Upload, manage, and track contracts with digital signatures and automatic reminders.",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: TrendingUp,
            title: "Athlete Tracking",
            description: "Monitor athlete progress, attendance, and performance metrics in real-time.",
            color: "bg-green-50 text-green-600"
        },
        {
            icon: Shield,
            title: "Secure Billing",
            description: "Automated subscription management with Stripe integration and payment tracking.",
            color: "bg-red-50 text-red-600"
        },
        {
            icon: Zap,
            title: "Analytics & Reports",
            description: "Comprehensive insights and reports to make data-driven decisions for your club.",
            color: "bg-yellow-50 text-yellow-600"
        }
    ];

    const steps = [
        {
            number: "01",
            title: "Create Your Club",
            description: "Sign up and set up your sports club profile in minutes."
        },
        {
            number: "02",
            title: "Add Athletes & Groups",
            description: "Invite athletes and organize them into training groups."
        },
        {
            number: "03",
            title: "Start Managing",
            description: "Automate billing, contracts, and scheduling effortlessly."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "FC Barcelona Academy Director",
            content: "SportBase transformed how we manage our youth programs. The automation saved us countless hours!",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Swimming Club Manager",
            content: "The billing integration is seamless. Our athletes love the transparency and ease of payment.",
            rating: 5
        },
        {
            name: "Emma Williams",
            role: "Tennis Academy Owner",
            content: "Finally, a platform that understands the needs of sports clubs. Highly recommended!",
            rating: 5
        }
    ];

    return (
        <>
            <Head title="Welcome to SportBase" />
            <div className="min-h-screen bg-white selection:bg-orange-500 selection:text-white font-[Outfit]">
                
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl">S</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">SportBase</span>
                            </div>
                            <div className="flex gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 pt-24">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                                    Manage Your Sports Club
                                    <br />
                                    <span className="text-orange-100">With Ease and Precision</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl lg:text-2xl text-orange-50 mb-12 max-w-3xl mx-auto leading-relaxed"
                            >
                                The all-in-one platform for sports clubs and athletes. Streamline training groups, automate subscriptions, and manage contracts effortlessly.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            >
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all shadow-2xl"
                                >
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <div className="flex items-center gap-3 text-white">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-orange-400 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                                            ))}
                                        </div>
                                        <p className="text-sm text-orange-100">Trusted by 500+ clubs</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="relative">
                        <svg className="absolute bottom-0 w-full h-12 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                        </svg>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: "Sports Clubs", value: 500, suffix: "+" },
                                { label: "Active Athletes", value: 10000, suffix: "+" },
                                { label: "Countries", value: 50, suffix: "+" },
                                { label: "Satisfaction", value: 99, suffix: "%" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2">
                                        <StatCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-gray-50 py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Everything You Need to Succeed
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Powerful features designed specifically for sports clubs and athletic organizations
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all"
                                >
                                    <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-white py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Get Started in 3 Simple Steps
                            </h2>
                            <p className="text-xl text-gray-600">
                                Launch your sports club management in minutes
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="relative"
                                >
                                    <div className="text-7xl font-bold text-orange-100 mb-4">{step.number}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                                            <ArrowRight className="w-8 h-8 text-orange-300" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="bg-gray-50 py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Loved by Sports Professionals
                            </h2>
                            <p className="text-xl text-gray-600">
                                See what club managers are saying about SportBase
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                                Ready to Transform Your Sports Club?
                            </h2>
                            <p className="text-xl text-orange-50 mb-8 leading-relaxed">
                                Join hundreds of clubs already using SportBase to streamline their operations
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-50 transition-all shadow-2xl"
                            >
                                Start Your Free Trial
                                <CheckCircle className="w-5 h-5" />
                            </Link>
                            <p className="text-orange-100 mt-4 text-sm">No credit card required • 14-day free trial</p>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg"></div>
                                    <span className="text-xl font-bold">SportBase</span>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    The all-in-one platform for sports club management.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Product</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Features</a></li>
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Pricing</a></li>
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Security</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Company</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">About</a></li>
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4">Legal</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy</a></li>
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Terms</a></li>
                                    <li><a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 pt-8 text-center">
                            <p className="text-gray-400 text-sm">
                                © 2026 SportBase. All rights reserved. Built with Laravel & React.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
