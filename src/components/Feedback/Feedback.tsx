import { Box, Container, Typography } from "@mui/material";
import { Star } from "../Star/Star";
import styles from './Feedback.module.scss'
export interface FeedbackProps {
    title: string;
    content: string;
    stars: number;
}

export const Feedback = ({ title, content, stars }: FeedbackProps) => {
    return (
        <Box className={styles.feedback}>
            <Typography className={styles.title}>{title}</Typography>
            <Typography className={styles.content}>{content}</Typography>
            <Container className={styles.starsContainer}>
                {new Array(stars).fill(1).map((s, i) => <Star key={i} />)}
            </Container>
        </Box>
    )
}