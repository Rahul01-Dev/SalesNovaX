import { Outlet,Navigate,Link } from "react-router-dom";
import { useState } from "react";
import Notifications from "./Notifications";

const Layout =()=>{

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isSidebarOpen,setIsSidebarOpen]=useState(true);

    const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);

    if(!token){
        return <Navigate to="/login" replace />
    }

    const logout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href="/login";
    }

    return(
        <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden relative">
            /* Sidebar for mobile */

           {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

             {/* Sidebar (Desktop: Flex/Static | Mobile: Fixed/Drawer) */}

              <aside
                className={`
                    fixed md:static inset-y-0 left-0 z-30 bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${isSidebarOpen ? 'w-64' : 'w-20'}
                `}
            >
                <div className="h-16 flex items-center justify-center border-b border-slate-700 relative">
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden absolute right-4 text-slate-400 hover:text-white"
                    >
                        ✕
                    </button>

                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">SalesFlow AI</h1>
                    ) : (
                        <span className="text-xl font-bold text-blue-400">SF</span>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarLink to="/dashboard" icon="📊" label="Dashboard" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/pipeline" icon="📋" label="Pipeline" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/products" icon="📦" label="Inventory" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/leads" icon="👥" label="Leads" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/invoices" icon="📄" label="Invoices" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/expenses" icon="💸" label="Expenses" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/clients" icon="🏢" label="Clients" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/payments" icon="💳" label="Payments" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    <SidebarLink to="/finance" icon="💰" label="Finance" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    {['owner', 'admin'].includes(user.role) && (
                        <SidebarLink to="/settings" icon="⚙️" label="Settings" isOpen={isSidebarOpen} onClick={() => setIsMobileMenuOpen(false)} />
                    )}
                </nav>

                {/* Desktop Collapse Toggle */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="hidden md:flex p-4 border-t border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors justify-center"
                >
                    {isSidebarOpen ? '◀ Collapse' : '▶'}
                </button>
            </aside>

             {/* Main Content Wrapper */}

             <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Top Header */}
                <header className="h-16 bg-slate-800 border-b border-slate-700 flex justify-between items-center px-4 md:px-6 shadow-md z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden text-slate-300 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div className="text-slate-400 text-sm hidden sm:block">
                            Welcome back, <span className="text-white font-medium">{user.name}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Notifications */}
                        <Notifications />

                        {/* User Profile Dropdown */}
                        <div className="flex items-center gap-3 pl-4 md:pl-6 border-l border-slate-700">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-slate-700">
                                {user.name ? user.name[0] : 'U'}
                            </div>
                            <div className="hidden lg:block text-sm">
                                <p className="font-medium text-white">{user.name}</p>
                                <p className="text-xs text-slate-400">{user.organization?.name}</p>
                            </div>
                            <button onClick={logout} className="ml-2 text-xs text-red-400 hover:text-red-300 font-medium hover:underline whitespace-nowrap">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto bg-slate-900 p-4 md:p-8">
                    <Outlet />
                </main>
            </div>

                
        </div>
    );
}

// Helper Component for Sidebar Links
const SidebarLink = ({ to, icon, label, isOpen, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all group"
    >
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
        {isOpen && <span className="font-medium whitespace-nowrap">{label}</span>}
    </Link>
);
export default Layout;
