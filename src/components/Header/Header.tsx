'use client'

import { Container, Button } from "@mui/material"
import Link from "next/link"
import styles from './Header.module.scss'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

export const Header = () => {
    return (
        <Container className={styles.header} component={'header'} maxWidth='lg'>
            <Link href='/'>
                <Button>Home</Button>
            </Link>
            <Link href='/collections'>
                <Button>Shop</Button>
            </Link>
            <Link href='/collections/about'>
                <Button>About us</Button>
            </Link>
            <Link href='/collections/contact'>
                <Button>Contacts</Button>
            </Link>
            <Link href='/collections/basket' className={styles.cartIcon}>
                <LocalMallOutlinedIcon sx={{ color: 'white' }} />
            </Link>
        </Container>
    )
}