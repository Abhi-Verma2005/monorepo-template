
import { trpc } from '../lib/trpc';
import { Trash2 } from 'lucide-react';

export default function Users() {
    const utils = trpc.useContext();
    const { data: users, isLoading, error } = trpc.user.getAll.useQuery();

    const deleteMutation = trpc.user.remove.useMutation({
        onSuccess: () => {
            utils.user.getAll.invalidate();
        },
        onError: (err) => {
            alert(err.message);
        }
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure? This will assume you are deleting yourself for now as per permissions.')) {
            deleteMutation.mutate({ id });
        }
    };

    if (isLoading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-600">Error: {error.message}</div>;

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Joined</th>
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {users?.map((user) => (
                            <tr key={user.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{user.name || 'N/A'}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
