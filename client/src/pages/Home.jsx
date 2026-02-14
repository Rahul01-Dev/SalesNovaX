import { Link } from "react-router-dom";
const Home = ()=>{
    return (
             <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                            SN
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                            SalesNovaX
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            Log In
                        </Link>
                        <Link
                            to="./register"
                            className="bg-white text-slate-900 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-xl shadow-white/10"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        AI-Powered Sales Engine
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        Close deals faster with <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Intelligent Automation
                        </span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Manage leads, automate invoices, and track revenue in one unified platform.
                        Empower your sales team with AI-driven insights.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800 border border-slate-700 text-white font-semibold text-lg hover:bg-slate-700 transition-all"
                        >
                            Live Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-900 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything you need to grow</h2>
                        <p className="text-slate-400">Powerful features built for modern sales teams.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🧠"
                            title="AI Lead Scoring"
                            desc="Automatically analyze calls and emails to score leads based on conversion probability."
                        />
                        <FeatureCard
                            icon="💳"
                            title="Instant Invoicing"
                            desc="Create professional invoices in seconds and accept payments via secure links."
                        />
                        <FeatureCard
                            icon="📊"
                            title="Revenue Analytics"
                            desc="Visualize your sales pipeline and track monthly recurring revenue in real-time."
                        />
                        <FeatureCard
                            icon="🤖"
                            title="Smart Automation"
                            desc="Automate follow-ups and routine tasks so you can focus on closing deals."
                        />
                        <FeatureCard
                            icon="🔒"
                            title="Secure Portal"
                            desc="Give clients their own portal to view invoices, history, and make payments."
                        />
                        <FeatureCard
                            icon="🌍"
                            title="Global Payments"
                            desc="Accept payments from anywhere in the world with multi-currency support."
                        />
                    </div>
                </div>
            </section>

            {/* Simple CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-slate-900 to-indigo-950/20" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to streamline your sales?</h2>
                    <p className="text-slate-400 mb-10 text-lg">
                        Join thousands of businesses using SalesNovaX to drive growth.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-10 py-4 rounded-full bg-white text-indigo-900 font-bold text-lg hover:bg-indigo-50 transition-colors shadow-2xl"
                    >
                        Get Started Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800/50 py-12 bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} SalesNovaX. All rights reserved.
                    </div>
                    <div className="flex gap-8 text-slate-400 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-indigo-500/30 transition-all group">
        <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default Home;