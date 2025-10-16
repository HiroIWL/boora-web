'use client';

import { useEffect, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Container,
    Typography,
    Button,
    FormSelect,
    FormInput,
} from '@/components';

interface Turma {
    id: string;
    nome: string;
}

export default function VincularDesafioPage() {
    const { id } = useParams();
    const router = useRouter();
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [data, setData] = useState('');
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const [nomeDesafio, setNomeDesafio] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const [turmasRes, desafioRes] = await Promise.all([
                    fetch('/api/turmas'),
                    fetch(`/api/desafios/${id}`),
                ]);
                const turmasData = await turmasRes.json();
                const desafioData = await desafioRes.json();
                setTurmas(turmasData);
                setNomeDesafio(desafioData.nome);
            } catch {
                setError('Erro ao carregar dados.');
            }
        }
        fetchData();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        startTransition(async () => {
            try {
                const res = await fetch(`/api/desafios/${id}/vincular`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data_desafio: data,
                        turmas: selected,
                    }),
                });

                if (!res.ok) throw new Error();
                alert('Desafio atribuído com sucesso!');
                router.push('/desafios/lista');
            } catch {
                setError('Erro ao atribuir desafio.');
            }
        });
    }

    return (
        <Container
            direction="column"
            align="center"
            gap={6}
            padding="md"
            className="h-content bg-white"
        >
            <Typography variant="title" color="black" weight="bold">
                Atribuir Desafios
            </Typography>

            <Typography variant="text" color="black" weight="regular">
                Desafio: {nomeDesafio || '...'}
            </Typography>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-6"
            >
                <FormSelect
                    label="Turmas"
                    multi
                    options={turmas.map((t) => ({
                        label: t.nome,
                        value: t.id,
                    }))}
                    onChange={(values) =>
                        setSelected(Array.isArray(values) ? values : [values])
                    }
                />

                <FormInput
                    label="Data do desafio"
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
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
                    disabled={pending}
                >
                    {pending ? 'Salvando...' : 'Salvar'}
                </Button>
            </form>
        </Container>
    );
}
