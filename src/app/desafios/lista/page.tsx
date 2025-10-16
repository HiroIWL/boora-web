'use client';

import { DesafioVisaoProfessor, DesafioVisaoAluno } from '@/components';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';

export default function ListaDesafios() {
    const { user, refreshUser } = useUser();

    useEffect(() => {
        refreshUser();
    }, []);
    if (!user) return null;
    return user.role === 'PROFESSOR' ? (
        <DesafioVisaoProfessor />
    ) : (
        <DesafioVisaoAluno />
    );
}
