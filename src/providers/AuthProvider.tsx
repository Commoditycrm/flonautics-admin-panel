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

    if (loading)
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-bg">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white shadow-[0_4px_16px_rgba(91,87,224,0.35)]">
                    F
                </div>
                <div className="h-1 w-28 overflow-hidden rounded-full bg-[#ececef]">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-brand" />
                </div>
            </div>
        );

    return <>{children}</>;
};
