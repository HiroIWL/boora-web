'use client';

import { useEffect, useState, useTransition } from 'react';
import { registerUserAction } from './actions';
import {
    Container,
    FormContainer,
    FormInput,
    Typography,
    Button,
    Header,
    FormSelect,
} from '@/components';
import { useUserType } from '@/context/UserTypeContext';

interface Turma {
    id: string;
    nome: string;
}

export default function CadastroAluno() {
    const { userType } = useUserType();
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [idTurma, setIdTurma] = useState('');
    const [error, setError] = useState('');
    const [pending, startTransition] = useTransition();

    useEffect(() => {
        async function fetchTurmas() {
            try {
                const res = await fetch('http://localhost:3001/api/turmas');
                const data = await res.json();
                setTurmas(data);
            } catch {
                setError('Erro ao carregar turmas.');
            }
        }
        fetchTurmas();
    }, []);

    function handleSubmit(formData: FormData) {
        startTransition(async () => {
            try {
                if (userType === 'ALUNO' && idTurma)
                    formData.set('id_turma', idTurma);

                console.log(formData);

                await registerUserAction(formData);
                window.location.href = '/login';
            } catch {
                setError('Erro ao cadastrar aluno.');
            }
        });
    }

    return (
        <Container
            direction="column"
            bg="white"
            padding="md"
            className="min-h-screen"
            fluid
        >
            <Container direction="column" className="pt-12 pb-12">
                <Header />
            </Container>

            <Container
                className="w-full max-w-md"
                direction="column"
                align="center"
                gap={6}
            >
                <Typography
                    className="mb-12"
                    variant="subtitle"
                    color="black"
                    weight="bold"
                >
                    Cadastrar Aluno
                </Typography>

                <FormContainer action={handleSubmit} gap={6}>
                    <FormInput
                        name="nome"
                        label="Nome do Aluno"
                        placeholder="Digite o nome do aluno"
                    />

                    <FormInput
                        name="codigo_registro"
                        maxLength={6}
                        label="Matrícula"
                        placeholder="Digite a matrícula do aluno"
                    />

                    <FormInput
                        name="senha"
                        label="Senha"
                        type="password"
                        placeholder="Digite uma senha"
                    />

                    {turmas.length > 0 && userType === 'ALUNO' && (
                        <FormSelect
                            name="id_turma"
                            label="Turma"
                            required
                            options={turmas.map((t) => ({
                                label: t.nome,
                                value: t.id,
                            }))}
                            onChange={(value) =>
                                typeof value === 'string' && setIdTurma(value)
                            }
                        />
                    )}

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
                        {pending ? 'Salvando...' : 'Salvar'}
                    </Button>
                </FormContainer>
            </Container>
        </Container>
    );
}
