'use client';

import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { Container } from './Container';
import { Typography } from './Typography';
import { ProfilePicture } from './ProfilePicture';
import { useEffect } from 'react';

let menuItems = [
    { label: 'Desafios', href: '/desafios' },
    { label: 'Ranking', href: '/ranking' },
    { label: 'Sair', href: '/' },
];

export function Sidebar() {
    const { user, logout } = useUser();
    useEffect(() => {}, [user]);
    const nome =
        user?.role === 'ALUNO'
            ? `${user.nome} - ${user.turma.nome}`
            : `Prof. ${user?.nome}`;

    if (user?.role === 'PROFESSOR') {
        menuItems = [
            { label: 'Gerenciar Desafios', href: '/desafios' },
            { label: 'Avaliar Entregas', href: '/entregas' },
            { label: 'Ranking', href: '/ranking' },
            { label: 'Sair', href: '/' },
        ];
    }

    return (
        <Container
            direction="column"
            align="center"
            justify="start"
            bg="primary"
            gap={6}
            className="w-64 h-[calc(100vh_-_48px)] bg-[#6DB66E] py-12 text-center mr-0 ml-0"
        >
            <ProfilePicture />
            <Container direction="column" align="center" gap={2}>
                <Typography variant="text" color="white" weight="light">
                    {nome}
                </Typography>
            </Container>

            <Container
                direction="column"
                align="start"
                gap={2}
                className="w-full px-8"
            >
                {menuItems.map((item) => (
                    <Link
                        onClick={() => {
                            if (item.label === 'Sair') {
                                logout();
                            }
                        }}
                        key={item.href}
                        href={item.href}
                        className="w-full text-left transition hover:opacity-80"
                    >
                        <Typography
                            variant="text"
                            color="white"
                            weight="semibold"
                        >
                            {item.label}
                        </Typography>
                    </Link>
                ))}
            </Container>
        </Container>
    );
}
