import { Box, Button } from '@mui/material'
import styles from './QuantitySelector.module.scss'

interface QuantitySelectorProps {
    quantity: number
    increase: VoidFunction
    decrease: VoidFunction
}

export const QuantitySelector = ({ quantity, increase, decrease }: QuantitySelectorProps) => {
    return (
        <Box className={styles.quantitySelector}>
            <Button onClick={decrease} className={styles.remove}>-</Button>
            <p>{quantity}</p>
            <Button onClick={increase} className={styles.add}>+</Button>
        </Box>
    )
}