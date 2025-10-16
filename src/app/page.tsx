import { ButtonLink, Container, Typography } from '@/components';
import Image from 'next/image';

export default function Home() {
    return (
        <Container
            align="stretch"
            className="min-h-screen flex"
            fluid={true}
            padding="none"
            bg="white"
        >
            <Container
                direction="column"
                align="center"
                justify="center"
                gap={6}
                className="w-1/2 text-center relative z-10"
            >
                <Typography variant="headline" color="primary" weight="bold">
                    Boora !
                </Typography>

                <Typography
                    variant="text"
                    color="primary"
                    className="max-w-md mb-8"
                >
                    Toda semana um novo desafio pra você se movimentar, acumular
                    pontos e subir no ranking da turma!
                </Typography>

                <Container
                    direction="column"
                    gap={2}
                    className="w-full max-w-xs"
                >
                    <ButtonLink
                        href="/select-user?criar=1"
                        variant="info"
                        textColor="white"
                    >
                        Criar conta
                    </ButtonLink>

                    <ButtonLink
                        href="/select-user"
                        variant="primary"
                        textColor="white"
                    >
                        Já tenho conta
                    </ButtonLink>
                </Container>
            </Container>

            <Container
                padding="none"
                bg="primary"
                align="center"
                justify="center"
                className="w-1/2 relative overflow-hidden"
            >
                <Image
                    src="/static/people.jpg"
                    alt="Ilustração pessoas se exercitando"
                    width={2048}
                    height={2048}
                    className="object-contain relative z-10 w-full"
                    priority
                />
            </Container>
        </Container>
    );
}
