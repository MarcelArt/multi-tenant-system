import { create } from 'zustand';

interface AuthState {
    accessToken?: string;
    username?: string;
    email?: string;
    userId?: number;
    setAccessToken: (token: string) => void;
    setUser: (token: string, username: string, email: string, userId: number) => void;
    logout: () => void;
}

const useAuth = create<AuthState>()((set) => ({
    accessToken: undefined,
    username: undefined,
    email: undefined,
    userId: undefined,
    setAccessToken: (token: string) => set({ accessToken: token }),
    setUser: (token: string, username: string, email: string, userId: number) => set({ accessToken: token, email, username, userId }),
    logout: () => set({ accessToken: undefined, email: undefined, username: undefined, userId: undefined }),
}));
export default useAuth;