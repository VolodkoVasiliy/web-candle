'use client'

import { OrderHeader } from "@/app/actions"
import { Box, Chip, ChipOwnProps, Container, IconButton } from "@mui/material"
import styles from './page.module.scss'
import { redirect } from "next/navigation"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CHIP_STYLE: Record<string, ChipOwnProps> = {
    CREATED: {
        variant: "outlined",
        label: 'Создан'
    },
    PAYED: {
        color: "success",
        variant: "outlined",
        label: 'Оплачен'
    },
    FULFILLED: {
        color: "success",
        label: 'Завершен'
    }
}

export const OrderList = ({ orders }: { orders: OrderHeader[] }) => {
    console.log(orders)
    return (
        <Container className={styles.container}>
            <Box className={styles.pageHeader}>
                <IconButton onClick={() => redirect('/admin')} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </IconButton>
                <h1>Add product</h1>
            </Box>
            <div>searchbox</div>
            <Box className={styles.filterContainer}>

            </Box>
            <p className={styles.ortedsTitle}>Заказы</p>
            <Box className={styles.orderListContainer}>
                {
                    orders.map((order) => {
                        return (
                            <Box key={order.id} className={styles.orderContainer}>
                                <Box>
                                    <p className={styles.orderDate}>Дата заказа: {order.createdAt?.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }).replaceAll('/', '-')}</p>
                                    <p className={styles.orderId}>Номер заказа: #{order.id}</p>
                                </Box>
                                <Box>
                                    <p className={styles.orderPrice}>{order.totalPrice / 100} zl</p>
                                    <Chip {...CHIP_STYLE[order.status!]} />
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
        </Container>
    )
}