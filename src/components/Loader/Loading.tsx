import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
    return (
        <Container sx={{
            width: '100dvw',
            height: '100dvh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress size={40} />
        </Container>
    )
}