'use client';

import { useEffect, useState, useTransition } from 'react';
import {
    Container,
    Typography,
    Header,
    FormContainer,
    FormInput,
    Button,
} from '@/components';
import { loginUserAction, logOut } from './actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserType } from '@/context/UserTypeContext';
import { useAuthenticated } from '@/context/AuthenticatedContext';

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [pending, startTransition] = useTransition();
    const { userType } = useUserType();
    const { setIsAuthenticated } = useAuthenticated();

    function handleSubmit(formData: FormData) {
        startTransition(async () => {
            setError('');
            try {
                await loginUserAction(formData);
                setIsAuthenticated(true);

                router.push('/desafios');
            } catch {
                setError('Credenciais inválidas. Tente novamente.');
            }
        });
    }

    useEffect(() => {
        if (!userType) {
            router.replace('/select-user');
        }
    }, []);

    return (
        <Container
            direction="column"
            bg="white"
            padding="md"
            className="min-h-screen"
            fluid={true}
        >
            <Container direction="column" className="pt-12 pb-12">
                <Header />
            </Container>

            <Container
                className="w-full max-w-md"
                direction="column"
                align="center"
                // gap={10}
            >
                <Typography
                    variant="subtitle"
                    weight="bold"
                    color="black"
                    className="mb-12"
                >
                    Entrar
                </Typography>

                <FormContainer action={handleSubmit} gap={6}>
                    <FormInput
                        name="registro_academico"
                        label="Registro Acadêmico"
                        placeholder="Digite seu RA"
                        maxLength={6}
                    />

                    <FormInput
                        name="senha"
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                    />

                    {error && (
                        <Typography
                            variant="caption"
                            color="primary"
                            className="text-red-500"
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        textColor="white"
                        className="mt-4"
                        disabled={pending}
                    >
                        {pending ? 'Entrando...' : 'Entrar'}
                    </Button>
                </FormContainer>

                <Link
                    href="/register"
                    className="text-blue-600 hover:underline text-sm mt-4"
                >
                    Não tem conta? Criar agora
                </Link>
            </Container>
        </Container>
    );
}
