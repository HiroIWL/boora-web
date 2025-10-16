'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, FormInput } from '@/components';

export default function CriarDesafioPage() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        nome: '',
        duracao: '',
        descricao: '',
        video_url: '',
        nota_maxima: '',
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        startTransition(async () => {
            try {
                const res = await fetch('/api/desafios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: form.nome,
                        duracao: Number(form.duracao),
                        descricao: form.descricao,
                        video_url: form.video_url,
                        nota_maxima: Number(form.nota_maxima),
                    }),
                });

                if (!res.ok) throw new Error();
                alert('Desafio criado com sucesso!');
                router.push('/desafios/lista');
            } catch {
                setError('Erro ao criar desafio.');
            }
        });
    }

    return (
        <Container
            direction="column"
            align="center"
            gap={6}
            padding="md"
            className="min-h-screen bg-white"
        >
            <Typography variant="title" color="black" weight="bold">
                Criar Novo Desafio
            </Typography>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-6"
            >
                <FormInput
                    label="Nome do desafio"
                    name="nome"
                    placeholder="Digite o nome do desafio"
                    value={form.nome}
                    onChange={handleChange}
                />

                <FormInput
                    label="Duração"
                    name="duracao"
                    type="number"
                    placeholder="Duração do desafio (em minutos)"
                    value={form.duracao}
                    onChange={handleChange}
                />

                <FormInput
                    label="Descrição"
                    name="descricao"
                    placeholder="Insira a descrição do desafio"
                    value={form.descricao}
                    onChange={handleChange}
                />

                <FormInput
                    label="Inserir a URL de vídeo tutorial"
                    name="video_url"
                    placeholder="Insira a URL do vídeo"
                    value={form.video_url}
                    onChange={handleChange}
                />

                <FormInput
                    label="Nota máxima"
                    name="nota_maxima"
                    type="number"
                    placeholder="Ex: 100"
                    value={form.nota_maxima}
                    onChange={handleChange}
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
