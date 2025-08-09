import { Box, Divider } from '@mui/material';
import styles from './Details.module.scss'
import { Product } from '@/app/actions';

export const Details = ({
    collectionName,
    scent,
    size,
    burnTime,
    type
}: Product & { collectionName: string }) => {
    return (
        <Box className={styles.container}>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Size</p>
                <p className={styles.value}>{size}</p>
            </Box>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Burn Time</p>
                <p className={styles.value}>{burnTime}</p>
            </Box>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Scent</p>
                <p className={styles.value}>{scent}</p>
            </Box>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Type</p>
                <p className={styles.value}>{type}</p>
            </Box>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Collection</p>
                <p className={styles.value}>{collectionName}</p>
            </Box>
        </Box>
    )
}