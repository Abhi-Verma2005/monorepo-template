import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { trpc } from './lib/trpc';
import { API_URL } from './utils/constants';

// Pages
import Login from './pages/Login';

export default function App() {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${API_URL}/trpc`,
                    headers() {
                        const token = localStorage.getItem('token');
                        return {
                            Authorization: token ? `Bearer ${token}` : undefined,
                        };
                    },
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </trpc.Provider>
    );
}
