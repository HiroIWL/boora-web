'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthenticatedContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    clear: () => void;
}

const AuthenticatedContext = createContext<
    AuthenticatedContextProps | undefined
>(undefined);

export function AuthenticatedProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const clear = () => setIsAuthenticated(false);

    return (
        <AuthenticatedContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, clear }}
        >
            {children}
        </AuthenticatedContext.Provider>
    );
}

export function useAuthenticated() {
    const context = useContext(AuthenticatedContext);
    if (!context)
        throw new Error('useToken deve ser usado dentro de TokenProvider');
    return context;
}
