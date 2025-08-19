import { Box, Divider } from '@mui/material';
import styles from './Details.module.scss'

export const Details = ({
    collectionName,
    // scent,
    size,
    burnTime,
    type
}: { collectionName: string; size: string; burnTime: string, scent: string, type: string }) => {
    return (
        <Box className={styles.container}>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Size</p>
                <p className={styles.value}>{size}</p>
            </Box>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Время горения</p>
                <p className={styles.value}>{burnTime}</p>
            </Box>
            {/* <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Запах</p>
                <p className={styles.value}>{scent}</p>
            </Box> */}
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Тип</p>
                <p className={styles.value}>{type}</p>
            </Box>
            <Divider flexItem />
            <Box className={styles.detailWrapper}>
                <p className={styles.key}>Коллекция</p>
                <p className={styles.value}>{collectionName}</p>
            </Box>
        </Box>
    )
}