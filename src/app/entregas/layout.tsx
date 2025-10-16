import { Container, Header, Sidebar } from '@/components';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container
            direction="column"
            bg="white"
            padding="none"
            align="start"
            className="min-h-screen max-h-screen m-0"
            fluid={true}
        >
            <Header isAuthenticated={true} />
            <Container
                direction="row"
                bg="white"
                padding="none"
                align="start"
                className="min-h-screen m-0"
                fluid={true}
            >
                <Sidebar />
                {children}
            </Container>
        </Container>
    );
}
