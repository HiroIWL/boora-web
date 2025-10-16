'use client';

import { useEffect, useState } from 'react';
import { Container } from './Container';
import { Typography } from './Typography';
import { ButtonLink } from './ButtonLink';
import { ProfilePicture } from './ProfilePicture';
import { useUser } from '@/context/UserContext';

interface Desafio {
    id: string;
    nome: string;
    duracao: number;
    descricao: string;
    video_url: string;
    nota_maxima: number;
    id_usuario_professor: string;
}

interface Desafio {
    id: string;
    nome: string;
    duracao: number;
    descricao: string;
    video_url: string;
    nota_maxima: number;
    id_usuario_professor: string;
}

interface Entrega {
    id: string;
    id_desafio: string;
    id_usuario_aluno: string;
    nota: number | null;
    video_url: string;
}

interface RankingAluno {
    id_aluno: string;
    nome_aluno: string;
    media_nota: number;
}

export function DesafioVisaoProfessor() {
    const [desafios, setDesafios] = useState<Desafio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchDesafios() {
            try {
                const res = await fetch('/api/desafios');
                if (!res.ok) throw new Error();
                const data = await res.json();
                setDesafios(data);
            } catch {
                setError('Erro ao carregar desafios.');
            } finally {
                setLoading(false);
            }
        }
        fetchDesafios();
    }, []);

    if (loading)
        return (
            <Container align="center" justify="center" className="min-h-screen">
                <Typography variant="text" color="black">
                    Carregando desafios...
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
            className="box-content max-w-lg bg-white py-12"
        >
            <Typography variant="title" color="black" weight="bold">
                Gerenciar Desafios
            </Typography>
            <Container direction="column" gap={6} className="w-lg max-w-lg max-h-[500px] overflow-scroll">
                {desafios.map((desafio) => (
                    <Container
                        key={desafio.id}
                        direction="row"
                        justify="between"
                        align="center"
                        bg="secondary"
                        className="rounded-2xl px-6 py-4 shadow-md w-full"
                    >
                        <Typography
                            variant="text"
                            color="white"
                            weight="semibold"
                        >
                            {desafio.nome}
                        </Typography>
                        <ButtonLink
                            href={`/desafios/${desafio.id}/vincular`}
                            variant="white"
                            textColor="black"
                            className="max-w-[200px] max-h-[42px] px-2 py-1 rounded-md"
                        >
                            Atribuir Desafio
                        </ButtonLink>
                    </Container>
                ))}
            </Container>
            <ButtonLink
                href="/desafios/novo"
                variant="primary"
                textColor="white"
                className="w-full max-w-xs flex items-center justify-center gap-2 mt-8"
            >
                Criar Novo Desafio +
            </ButtonLink>
        </Container>
    );
}

export function DesafioVisaoAluno() {
    const [desafios, setDesafios] = useState<Desafio[]>([]);
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [ranking, setRanking] = useState<RankingAluno[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useUser();

    useEffect(() => {
        async function fetchData() {
            try {
                const [desafiosRes, entregasRes, rankingRes] =
                    await Promise.all([
                        fetch('/api/desafios'),
                        fetch('/api/entregas'),
                        fetch('/api/ranking/alunos'),
                    ]);
                if (!desafiosRes.ok || !entregasRes.ok || !rankingRes.ok)
                    throw new Error();

                const desafiosData = await desafiosRes.json();
                const entregasData = await entregasRes.json();
                const rankingData = await rankingRes.json();

                setDesafios(desafiosData);
                setEntregas(entregasData);
                setRanking(rankingData);
            } catch {
                setError('Erro ao carregar dados.');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading)
        return (
            <Container align="center" justify="center" className="min-h-screen">
                <Typography variant="text" color="black">
                    Carregando Dados...
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

    const entregues = entregas.map((e) => e.id_desafio);
    const proximoDesafio = desafios.find((d) => !entregues.includes(d.id));
    const userId = user?.sub;

    console.log(ranking.findIndex((r) => r.id_aluno === userId));
    const posicao =
        ranking.findIndex((r) => r.id_aluno === userId) + 1 || ranking.length;

    const top3 = posicao > 0 && posicao <= 3;
    const posicaoLabel =
        posicao === 0
            ? '-'
            : posicao === 1
            ? '1º lugar'
            : posicao === 2
            ? '2º lugar'
            : posicao === 3
            ? '3º lugar'
            : `${posicao}º lugar`;

    return (
        <Container
            direction="column"
            align="center"
            gap={6}
            className="h-content bg-white py-12"
            fluid
        >
            <Container direction="column" align="center" gap={2}>
                <ProfilePicture />
                <Typography variant="text" color="black" weight="bold">
                    {user?.nome}
                </Typography>
            </Container>

            <Container
                direction="column"
                gap={2}
                fluid
                className="w-full max-w-md"
            >
                <Container
                    bg="secondary"
                    justify="between"
                    align="center"
                    padding="sm"
                    rounded
                    className="w-full"
                >
                    <Typography variant="text" color="white" weight="semibold">
                        Ranking da Turma
                    </Typography>
                    <Typography
                        variant="text"
                        color="white"
                        className={top3 ? '!text-yellow-300 font-semibold' : ''}
                    >
                        {posicaoLabel}
                    </Typography>
                </Container>

                <Container
                    justify="between"
                    align="center"
                    padding="sm"
                    rounded
                    className="w-full !bg-gray-500"
                >
                    <Typography variant="text" color="white" weight="semibold">
                        Próximo Desafio
                    </Typography>
                    <Typography
                        variant="text"
                        color="black"
                        className="bg-[#FF8C00] text-white px-3 py-1 rounded-md"
                    >
                        {proximoDesafio
                            ? proximoDesafio.nome
                            : 'Todos completos'}
                    </Typography>
                </Container>
            </Container>

            {proximoDesafio && (
                <ButtonLink
                    href={`/desafios/${proximoDesafio.id}`}
                    variant="primary"
                    textColor="white"
                    className="w-full max-w-xs mt-6"
                >
                    Iniciar Próximo Desafio
                </ButtonLink>
            )}
        </Container>
    );
}
