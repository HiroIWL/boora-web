'use client';

import { useEffect, useState } from 'react';
import { Container, Typography } from '@/components';
import { cn } from '@/lib/utils';

interface TurmaRanking {
    id_turma: string;
    nome_turma: string;
    media_desempenho: number;
}

export default function RankingPage() {
    const [ranking, setRanking] = useState<TurmaRanking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchRanking() {
            try {
                const res = await fetch('/api/ranking', { cache: 'no-store' });
                if (!res.ok) throw new Error();
                const data = await res.json();
                setRanking(data);
            } catch {
                setError('Erro ao carregar ranking.');
            } finally {
                setLoading(false);
            }
        }
        fetchRanking();
    }, []);

    if (loading)
        return (
            <Container align="center" justify="center" className="min-h-screen">
                <Typography variant="text" color="black">
                    Carregando ranking...
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
            gap={6}
            padding="lg"
            className="h-content bg-white py-12"
        >
            <Typography variant="title" color="black" weight="bold">
                Ranking das Turmas
            </Typography>

            <Container
                direction="column"
                align="center"
                gap={2}
                className="w-full max-w-md"
            >
                {ranking.map((turma, index) => {
                    const posicao = index + 1;
                    const isTop3 = posicao <= 3;
                    const bgClasse = isTop3 ? 'bg-yellow-400' : '';

                    return (
                        <Container
                            key={turma.id_turma}
                            direction="row"
                            justify="between"
                            align="center"
                            bg="secondary"
                            className={cn(
                                'rounded-full px-6 py-3 w-full relative',
                                bgClasse
                            )}
                        >
                            <Container direction="row" align="center" gap={3}>
                                <Typography
                                    variant={isTop3 ? 'subtitle' : 'text'}
                                    color="white"
                                    weight="semibold"
                                >
                                    {turma.nome_turma}
                                </Typography>
                            </Container>

                            <Typography
                                variant={isTop3 ? 'subtitle' : 'text'}
                                color="white"
                                weight="semibold"
                                className={cn(isTop3 ? '!text-[#FF0000]' : '')}
                            >
                                {posicao}º
                            </Typography>
                        </Container>
                    );
                })}
            </Container>
        </Container>
    );
}
