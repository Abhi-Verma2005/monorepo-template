import { useNavigate } from 'react-router-dom';
import { trpc } from '../lib/trpc';


export const useAuth = () => {
    const navigate = useNavigate();
    const utils = trpc.useContext(); // or useUtils in v11

    // We can use a query to check if the token is valid or just rely on local state + error handling
    // For this MVP, we'll store token in localStorage and rely on tRPC errors to redirect

    const loginMutation = trpc.auth.login.useMutation({
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            navigate('/');
        },
    });

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        utils.invalidate();
    };

    const isAuthenticated = !!localStorage.getItem('token');

    return {
        login: loginMutation.mutate,
        isLoading: loginMutation.isLoading,
        error: loginMutation.error,
        logout,
        isAuthenticated,
    };
};
