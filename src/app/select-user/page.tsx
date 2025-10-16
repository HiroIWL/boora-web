'use client';

import { Button, Container, Typography } from '@/components';
import { useUserType } from '@/context/UserTypeContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SelectUser() {
    const { setUserType } = useUserType();
    const router = useRouter();
    const params = useSearchParams();

    const isCriar = params.get('criar') === '1';

    function handleSelect(type: 'ALUNO' | 'PROFESSOR') {
        setUserType(type);
        router.push(isCriar ? '/register' : '/login');
    }

    return (
        <Container
            direction="column"
            align="center"
            justify="center"
            bg="primary"
            className="min-h-screen gap-10"
            fluid={true}
        >
            <Typography variant="headline" color="primary" weight="bold">
                Boora !
            </Typography>

            <Typography variant="subtitle" color="white" weight="bold">
                Você é:
            </Typography>

            <Container direction="column" gap={2} className="w-64">
                <Button
                    variant="primary"
                    textColor="white"
                    onClick={() => handleSelect('ALUNO')}
                >
                    Aluno
                </Button>
                <Button
                    variant="primary"
                    textColor="white"
                    onClick={() => handleSelect('PROFESSOR')}
                >
                    Professor
                </Button>
            </Container>
        </Container>
    );
}
