import Box from "@mui/material/Box"
import styles from './ShopCard.module.scss'
import { Button, Typography } from "@mui/material"
import { IPrice, IItem } from "@/app/mocks/indes"

const currencyMapper = {
    'usd': '$',
    'zl': 'zl',
    'eur': '€'
}

const convertPrice = ({ value, curency }: IPrice): string => {
    return `${value}${currencyMapper[curency]}`
}

export const ShopCard = ({
    imgUrl,
    price,
    title,
    subtitle,
    onClick
}: IItem & { onClick: () => void }) => {
    return (
        <Box className={styles.card}>
            <Box component='div' style={{ backgroundImage: `url(${imgUrl})` }} className={styles.cardImg}>
                <Button onClick={onClick}>
                    <Typography variant="h3" className={styles.button}>Add to card</Typography>
                </Button>
            </Box>
            <Typography variant="body1">{title}</Typography>
            <Typography variant="body2">{subtitle}</Typography>
            <Typography variant="body2">{convertPrice(price)}</Typography>
        </Box>
    )
}