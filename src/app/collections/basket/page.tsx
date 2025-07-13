
'use client'
import { Box, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decreaseQuantity, increaseQuantity, removeProductFromCart, selectCart } from "@/store/cart/cartSlice";
import { QuantitySelector } from "@/components/QantitySelector/QuantitySelector";
import { Banner } from "@/components/Banner/Banner";
import styles from './page.module.scss'
import { useState } from "react";
import clsx from 'clsx'
import ClearIcon from '@mui/icons-material/Clear';

export default function BasketPage() {
    const { products } = useAppSelector(selectCart)
    const dispatch = useAppDispatch()
    const [messsage, setMessage] = useState('')

    return (
        <Container className={styles.container}>
            <Box className={styles.products}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader className={styles.table}>
                        <TableHead className={styles.tableHead}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell colSpan={2}>Products</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={styles.tableBody}>
                            {products.map((p, index) => (
                                <TableRow key={p.id} className={clsx(styles.tableRow, styles[`tableRow-${index % 2 ? 'even' : 'odd'}`])}>
                                    <TableCell width={80} padding="none" align="center">
                                        <IconButton onClick={() => dispatch(removeProductFromCart(p))}>
                                            <ClearIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell width={120} padding="none">
                                        <Image
                                            src={p.imgUrl}
                                            alt={p.title}
                                            width={120}
                                            height={120}
                                            className={styles.productImg}
                                        />
                                    </TableCell>
                                    <TableCell>{p.title}</TableCell>
                                    <TableCell >{p.price.value}</TableCell>
                                    <TableCell>
                                        <QuantitySelector
                                            quantity={p.quantity}
                                            decrease={() => dispatch(decreaseQuantity(p))}
                                            increase={() => dispatch(increaseQuantity(p))}
                                        />
                                    </TableCell>
                                    <TableCell>{p.price.value * p.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box className={styles.subtotal}>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell>
                                Subtotal:
                            </TableCell>
                            <TableCell>
                                {products.reduce((acc, pr) => acc + (pr.price.value * pr.quantity), 0)}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <Typography variant="nav">Order comment</Typography>
                <TextField value={messsage} onChange={(e) => setMessage(e.target.value)} multiline rows={7} />
            </Box>
            <Banner />
        </Container>
    )
}