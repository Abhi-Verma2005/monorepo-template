import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { trpc } from './lib/trpc';
import { API_URL } from './utils/constants';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

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
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </trpc.Provider>
    );
}
