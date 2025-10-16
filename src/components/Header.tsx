import { Container } from './Container';
import { Typography } from './Typography';
type HeaderProps = {
    isAuthenticated?: boolean;
};

export function Header({ isAuthenticated }: HeaderProps) {
    return isAuthenticated ? (
        <Container fluid={true} shadow={true} padding="xs">
            <Typography weight="bold" variant="subtitle" color="primary">
                Boora !
            </Typography>
        </Container>
    ) : (
        <Typography weight="bold" variant="headline" color="primary">
            Boora !
        </Typography>
    );
}
