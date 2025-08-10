'use client'

import { Container, Button, IconButton, Drawer } from "@mui/material"
import Link from "next/link"
import styles from './Header.module.scss'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useMemo, useState } from "react";
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoOutlineRoundedIcon from '@mui/icons-material/InfoOutlineRounded';
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';
import { usePathname } from "next/navigation";
import clsx from 'clsx'

const NO_HEADER_PAGES = [
    'cart',
    'auth',
    'admin'
]

const PAGE_HEADER_TITLE = {
    '/collections': 'Inner Light Collections',
    '/shop': 'Shop',
    '/contact': 'Contact'
} as Record<string, string>

export const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const pathName = usePathname()

    const isHeaderShown = useMemo(() => {
        return !NO_HEADER_PAGES.some((page) => {
            return pathName.includes(page)
        })
    }, [pathName])

    const handleClose = () => {
        setIsDrawerOpen(false)
    }

    if (!isHeaderShown) {
        return null;
    }

    return (
        <Container
            className={clsx(styles.header, {
                [styles.firstPage]: pathName === `/`
            })}
            component={'header'} maxWidth='lg'
        >
            <IconButton className={styles.burger} onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>

            <h1 className={styles.headerTitle}>{PAGE_HEADER_TITLE[pathName]}</h1>

            <Link href='/cart' className={styles.cartIcon}>
                <LocalMallOutlinedIcon sx={{ color: 'white' }} />
            </Link>
            <Drawer open={isDrawerOpen} onClose={handleClose} slotProps={{
                paper: {
                    className: styles.drawer
                }
            }}>
                <Link className={styles.link} href='/'>
                    <Button startIcon={<HomeRoundedIcon />} onClick={handleClose}>Home</Button>
                </Link>
                <Link className={styles.link} href='/shop'>
                    <Button startIcon={<StorefrontRoundedIcon />} onClick={handleClose}>Shop</Button>
                </Link>
                <Link className={styles.link} href='/collections'>
                    <Button startIcon={<PermMediaRoundedIcon />} onClick={handleClose}>Collections</Button>
                </Link>
                <Link className={styles.link} href='/about'>
                    <Button startIcon={<InfoOutlineRoundedIcon />} onClick={handleClose}>About</Button>
                </Link>
                <Link className={styles.link} href='/contact'>
                    <Button onClick={handleClose}>Contact</Button>
                </Link>
                <Link className={styles.link} href='/contact'>
                    <Button onClick={handleClose}>Follow us</Button>
                </Link>
            </Drawer>

        </Container>
    )
}