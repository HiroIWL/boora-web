'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Button, Modal, FormInput } from '@/components';
import { useRouter } from 'next/navigation';

interface Desafio {
    id: string;
    nome: string;
    descricao: string;
    video_url: string;
}

export default function DesafioPage() {
    const { id } = useParams();
    const [desafio, setDesafio] = useState<Desafio | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchDesafio() {
            try {
                const res = await fetch(`/api/desafios/${id}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                setDesafio(data);
            } catch {
                setError('Erro ao carregar desafio.');
            } finally {
                setLoading(false);
            }
        }
        fetchDesafio();
    }, [id]);

    function isYoutube(url: string) {
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
    }

    function getYoutubeEmbed(url: string) {
        const match = url.match(
            /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    }

    async function handleSubmit() {
        if (!videoUrl) return;
        setSubmitting(true);
        try {
            const res = await fetch('/api/entregas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_desafio: id,
                    video_url: videoUrl,
                }),
            });
            if (!res.ok) throw new Error();
            setShowModal(false);
            setVideoUrl('');
            alert('Entrega registrada com sucesso!');
            router.push('/desafios');
        } catch {
            alert('Erro ao registrar entrega.');
        } finally {
            setSubmitting(false);
        }
    }

    if (loading)
        return (
            <Container align="center" justify="center" className="min-h-screen">
                <Typography variant="text" color="black">
                    Carregando desafio...
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

    if (!desafio) return null;

    const embed = isYoutube(desafio.video_url)
        ? getYoutubeEmbed(desafio.video_url)
        : null;

    return (
        <Container
            direction="column"
            align="center"
            gap={10}
            padding="md"
            className="h-content bg-white py-12"
            fluid
        >
            <Typography variant="subtitle" color="black" weight="bold">
                Hoje seu desafio é '{desafio.nome}'!
            </Typography>

            <Container
                bg="primary"
                direction="column"
                gap={10}
                padding="md"
                rounded
                className="max-w-lg w-full"
            >
                <Container
                    bg="transparent"
                    direction="column"
                    rounded
                    className="w-full"
                    gap={2}
                >
                    <Typography variant="text" color="white" weight="semibold">
                        Dicas:
                    </Typography>
                    <Typography
                        variant="caption"
                        color="white"
                        weight="regular"
                    >
                        {desafio.descricao}
                    </Typography>
                </Container>

                <Container
                    bg="white"
                    direction="column"
                    align="center"
                    justify="center"
                    className="rounded-md p-4 w-full"
                    gap={2}
                >
                    <Typography variant="text" color="black" weight="semibold">
                        Ver Tutorial em vídeo
                    </Typography>

                    {embed ? (
                        <iframe
                            src={embed}
                            className="w-full h-64 rounded-md mt-2"
                            allowFullScreen
                        />
                    ) : (
                        <Typography
                            variant="caption"
                            color="black"
                            className="mt-2 text-red-500"
                        >
                            Link de vídeo inválido
                        </Typography>
                    )}
                </Container>
            </Container>

            <Button
                variant="white"
                textColor="black"
                className="bg-gray-200 px-6 py-3 rounded-md max-w-md"
                onClick={() => setShowModal(true)}
            >
                Registre seu desafio 📷
            </Button>

            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Typography variant="subtitle" color="black" weight="bold">
                    Registrar Entrega
                </Typography>

                <FormInput
                    label="URL do vídeo"
                    type="url"
                    placeholder="Insira a URL do vídeo"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />

                <Container justify="center" gap={6} className="mt-4 w-full">
                    <Button
                        variant="primary"
                        textColor="white"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? 'Enviando...' : 'Enviar'}
                    </Button>

                    <Button
                        variant="white"
                        textColor="black"
                        onClick={() => setShowModal(false)}
                    >
                        Cancelar
                    </Button>
                </Container>
            </Modal>
        </Container>
    );
}
