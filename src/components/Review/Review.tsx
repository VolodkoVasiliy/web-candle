import { Avatar, Box } from "@mui/material"
import { Star } from "../Star/Star"
import styles from './Review.module.scss'

export interface IReview {
    stars: number;
    name: string;
    review: string;
    avatar: string;
    timeStamp: string;
}

export const Review = ({
    stars,
    avatar,
    review,
    timeStamp,
    name
}: IReview) => {
    return (
        <Box className={styles.reviewContainer}>
            <Box className={styles.titleContainer}>
                <Avatar src={avatar} />
                <Box>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.timeStamp}>{timeStamp}</p>
                </Box>
            </Box>
            <Box className={styles.starsContainer}>
                {new Array(stars).fill(1).map((el, i) => <Star color='black' key={i} />)}
            </Box>
            <p className={styles.review}>{review}</p>
        </Box>
    )
}