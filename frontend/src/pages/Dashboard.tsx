
import { trpc } from '../lib/trpc';


export default function Dashboard() {
    const { data: users, isLoading } = trpc.user.getAll.useQuery();

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">
                        {isLoading ? '...' : users?.length || 0}
                    </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Active Sessions</h3>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">1</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">System Status</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">Operational</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Activity</h2>
                <div className="rounded-lg bg-white p-6 shadow-sm text-gray-500">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
}
