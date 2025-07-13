import { Box } from "@mui/material"
import styles from './Banner.module.scss'

export const Banner = () => {
    return (
        <Box className={styles.container}>
            <p className={styles.center}>Luminous Nature</p>
            <p className={styles.leftTop}>Conscious choice for the environment</p>
            <p className={styles.leftBottom}>Crafted with care, priced with you in mind</p>
            <p className={styles.rightTop}>Embrace the beauty of affordability with our handmade candles</p>
            <p className={styles.rightBottom}>Natural ingredients</p>
        </Box>
    )
}