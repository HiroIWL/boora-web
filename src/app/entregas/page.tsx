'use client';

import { useEffect, useState, useTransition } from 'react';
import { Container, Typography, Button, Modal, FormInput } from '@/components';

interface Entrega {
    id: string;
    video_url: string;
    nota?: number;
    desafio: {
        id: string;
        nome: string;
    };
    aluno: {
        nome: string;
        turma: {
            nome: string;
        };
    };
}

export default function ListaEntregas() {
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pending, startTransition] = useTransition();
    const [selected, setSelected] = useState<Entrega | null>(null);
    const [nota, setNota] = useState('');

    function handleNotaChange(nota: string) {
        if (+nota < 0) {
            setNota('0');
            return;
        }

        if (+nota > 1000) {
            setNota('999');
            return;
        }

        setNota(nota);
    }

    async function fetchEntregas() {
        try {
            const res = await fetch('/api/entregas', { cache: 'no-store' });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setEntregas(data);
        } catch {
            setError('Erro ao carregar entregas.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEntregas();
    }, []);

    async function handleAvaliar() {
        if (!selected) return;
        startTransition(async () => {
            try {
                const res = await fetch(
                    `/api/entregas/${selected.id}/avaliar`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nota: Number(nota) }),
                    }
                );
                if (!res.ok) throw new Error();
                alert('Nota atribuída com sucesso!');
                setSelected(null);
                setNota('');
                await fetchEntregas();
            } catch {
                alert('Erro ao salvar nota.');
            }
        });
    }

    if (loading)
        return (
            <Container align="center" justify="center" className="min-h-screen">
                <Typography variant="text" color="black">
                    Carregando entregas...
                </Typography>
            </Container>
        );

    if (error)
        return (
            <Container align="center" justify="center" className="min-h-screen">
                <Typography
                    variant="text"
                    color="black"
                    className="text-red-500"
                >
                    {error}
                </Typography>
            </Container>
        );

    return (
        <Container
            direction="column"
            align="center"
            gap={10}
            padding="md"
            className="h-content bg-white py-12"
            fluid
        >
            <Typography variant="title" color="black" weight="bold">
                Avaliar Entregas
            </Typography>

            <Container direction="column" gap={6} className="w-full max-w-lg">
                {entregas.map((entrega) => (
                    <Container
                        key={entrega.id}
                        direction="row"
                        justify="between"
                        align="center"
                        padding="sm"
                        rounded
                        className="shadow-md w-full !bg-gray-300"
                    >
                        <Container
                            fluid
                            padding="none"
                            align="start"
                            justify="center"
                            direction="column"
                        >
                            <Typography
                                variant="label"
                                color="black"
                                weight="semibold"
                            >
                                Desafio: {entrega.desafio?.nome}
                            </Typography>
                            <Typography
                                variant="label"
                                color="black"
                                weight="light"
                            >
                                {entrega.aluno?.nome} -{' '}
                                {entrega.aluno.turma.nome}
                            </Typography>
                        </Container>
                        {!entrega.nota ? (
                            <Button
                                variant="primary"
                                textColor="white"
                                disabled={pending}
                                className="!px-6 !py-1 !w-auto"
                                onClick={() => setSelected(entrega)}
                            >
                                Avaliar
                            </Button>
                        ) : (
                            <Button
                                variant="info"
                                textColor="white"
                                disabled
                                className="!px-6 !py-1 !w-auto"
                            >
                                Avaliado
                            </Button>
                        )}
                    </Container>
                ))}
            </Container>

            {selected && (
                <Modal onClose={() => setSelected(null)}>
                    <Container direction="column" gap={6} padding="md">
                        <Typography
                            variant="subtitle"
                            color="black"
                            weight="bold"
                        >
                            {selected.desafio?.nome}
                        </Typography>

                        <Typography variant="text" color="black">
                            Aluno: {selected.aluno?.nome}
                        </Typography>

                        <Typography variant="text" color="black">
                            Vídeo:{' '}
                            <a
                                href={selected.video_url}
                                target="_blank"
                                className="text-blue-600 underline"
                            >
                                {selected.video_url}
                            </a>
                        </Typography>

                        <FormInput
                            label="Nota"
                            type="number"
                            placeholder="Digite a nota do aluno"
                            value={nota}
                            maxLength={3}
                            onChange={(e) => handleNotaChange(e.target.value)}
                        />

                        <Container
                            fluid
                            className="w-full"
                            direction="row"
                            justify="between"
                            gap={2}
                        >
                            <Button
                                variant="white"
                                textColor="black"
                                onClick={() => setSelected(null)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant="primary"
                                textColor="white"
                                onClick={handleAvaliar}
                                disabled={pending}
                            >
                                {pending ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </Container>
                    </Container>
                </Modal>
            )}
        </Container>
    );
}
