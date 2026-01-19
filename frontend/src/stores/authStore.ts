import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    name: string | null;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setAuth: (token: string, user: User) => void;
    logout: () => void;
    initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    setUser: (user) => set({ user }),

    setToken: (token) => {
        if (token) {
            localStorage.setItem('token', token);
            set({ token, isAuthenticated: true });
        } else {
            localStorage.removeItem('token');
            set({ token: null, isAuthenticated: false });
        }
    },

    setAuth: (token, user) => {
        localStorage.setItem('token', token);
        set({ token, user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    initAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
            set({ token, isAuthenticated: true });
        }
    },
}));
