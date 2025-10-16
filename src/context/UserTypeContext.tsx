'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type UserType = 'ALUNO' | 'PROFESSOR' | null;

interface UserTypeContextProps {
    userType: UserType;
    setUserType: (type: UserType) => void;
}

const UserTypeContext = createContext<UserTypeContextProps | undefined>(
    undefined
);

export function UserTypeProvider({ children }: { children: ReactNode }) {
    const [userType, setUserType] = useState<UserType>('ALUNO');
    return (
        <UserTypeContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserTypeContext.Provider>
    );
}

export function useUserType() {
    const context = useContext(UserTypeContext);
    if (!context)
        throw new Error('useUserType deve estar dentro de UserTypeProvider');
    return context;
}
