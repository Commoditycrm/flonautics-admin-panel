'use client';

import { ReactNode, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

import { useAuthStore } from '../store/useAuthStore';
import { app } from '@/firebaseConfig';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const setUser = useAuthStore((state) => state.setUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser]);

    if (loading) return <div>Loading...</div>; // Optional: improve UX

    return <>{children}</>;
};
