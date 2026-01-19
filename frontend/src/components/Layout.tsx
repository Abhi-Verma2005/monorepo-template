
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

export default function Layout() {
    const { logout, isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="flex h-16 items-center justify-center border-b px-4">
                    <span className="text-xl font-bold text-indigo-600">SaaS Template</span>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <LayoutDashboard className="mr-3 h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/users"
                        className="flex items-center rounded-md px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <User className="mr-3 h-5 w-5" />
                        Users
                    </Link>
                </nav>
                <div className="absolute bottom-0 w-64 border-t p-4">
                    <button
                        onClick={logout}
                        className="flex w-full items-center rounded-md px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <Outlet />
            </div>
        </div>
    );
}
