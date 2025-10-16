'use client';

import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Typography } from './Typography';

export function ProfilePicture() {
    const { user } = useUser();
    if (!user) return null;

    const initials = user.nome
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <Container
            align="center"
            justify="center"
            bg="white"
            className={cn(
                'rounded-full w-[125px] h-[125px] border-4 border-sky-500'
            )}
        >
            <Typography
                variant="title"
                color="primary"
                weight="regular"
                className="uppercase w-[36px] flex items-center justify-center"
            >
                {initials}
            </Typography>
        </Container>
    );
}
