'use client'

import { Container, Button, IconButton, Drawer } from "@mui/material"
import Link from "next/link"
import styles from './Header.module.scss'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useIsPhoneOrSmaller } from "@/utils/hooks";
import { useState } from "react";

export const Header = () => {
    const isPhoneOrSmaller = useIsPhoneOrSmaller()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleClose = () => {
        setIsDrawerOpen(false)
    }
    return (
        <Container className={styles.header} component={'header'} maxWidth='lg'>
            {isPhoneOrSmaller ?
                <>
                    <IconButton className={styles.burger} onClick={() => setIsDrawerOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={isDrawerOpen} onClose={handleClose} slotProps={{
                        paper: {
                            className: styles.drawer
                        }
                    }}>
                        <Link href='/'>
                            <Button onClick={handleClose}>Home</Button>
                        </Link>
                        <Link href='/collections'>
                            <Button onClick={handleClose}>Shop</Button>
                        </Link>
                        <Link href='/collections/about'>
                            <Button onClick={handleClose}>About us</Button>
                        </Link>
                        <Link href='/collections/contact'>
                            <Button onClick={handleClose}>Contacts</Button>
                        </Link>
                    </Drawer>
                    <Link href='/collections/basket' className={styles.cartIcon}>
                        <LocalMallOutlinedIcon sx={{ color: 'white' }} />
                    </Link>
                </>
                :
                <>
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
                </>
            }

        </Container>
    )
}