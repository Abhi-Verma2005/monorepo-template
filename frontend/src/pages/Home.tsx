import { useNavigate } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export default function Home() {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const logout = useAuthStore((state) => state.logout);

    const { data, isLoading, error } = trpc.user.me.useQuery();

    useEffect(() => {
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    useEffect(() => {
        if (error?.data?.code === 'UNAUTHORIZED') {
            logout();
            navigate('/login');
        }
    }, [error, logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-indigo-50 border border-indigo-200 rounded-md p-4">
                            <h2 className="text-sm font-medium text-indigo-900 mb-2">Your Profile</h2>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-sm font-medium text-indigo-700">Email: </span>
                                    <span className="text-sm text-indigo-900">{user.email}</span>
                                </div>
                                {user.name && (
                                    <div>
                                        <span className="text-sm font-medium text-indigo-700">Name: </span>
                                        <span className="text-sm text-indigo-900">{user.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleLogout}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
