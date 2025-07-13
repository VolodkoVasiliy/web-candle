import { Box, ButtonBase, Typography } from '@mui/material'
import styles from './QuantitySelector.module.scss'

interface QuantitySelectorProps {
    quantity: number
    increase: VoidFunction
    decrease: VoidFunction
}

export const QuantitySelector = ({ quantity, increase, decrease }: QuantitySelectorProps) => {
    return (
        <Box className={styles.container}>
            <ButtonBase className={styles.button} onClick={decrease}><Typography variant='text20'>-</Typography></ButtonBase>
            <Typography variant='text14'>{quantity}</Typography>
            <ButtonBase className={styles.button} onClick={increase}><Typography variant='text20'>+</Typography></ButtonBase>
        </Box>
    )
}