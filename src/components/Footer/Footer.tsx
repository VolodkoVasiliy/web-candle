'use client'

import { Container, Divider, List, ListItem, ListSubheader, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import styles from './Footer.module.scss'

export const Footer = () => {
    return (
        <Container component={'footer'} className={styles.footer}>
            <Container className={styles.wrapper} maxWidth='lg'>
                <Container className={styles.section}>
                    <Image
                        src={'/footer/logo.png'}
                        alt="logo-footer"
                        width={213}
                        height={149}
                    />
                </Container>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'black' }} />
                <Container className={styles.section}>
                    <List component={'nav'} subheader={
                        <ListSubheader sx={{ background: 'none' }}>
                            <Typography variant="body2bold">Menu</Typography>
                        </ListSubheader>
                    }>
                        <ListItem>
                            <Link href={'/about'}>
                                <Typography variant="text14">About Us</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>
                                <Typography variant="text14">Shop now</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>
                                <Typography variant="text14">Visit Our Masterclass</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>
                                <Typography variant="text14">Our Natural Ingredients</Typography>
                            </Link>
                        </ListItem>
                    </List>
                </Container>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'black' }} />
                <Container className={styles.section}>
                    <List>
                        <ListItem>
                            <Link href={'/about'}>About Us</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>Shop now</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>Visit Our Masterclass</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>Our Natural Ingredients</Link>
                        </ListItem>
                    </List>
                </Container>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'black' }} />
                <Container className={styles.section}>
                    <List>
                        <ListItem>
                            <Link href={'/about'}>About Us</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>Shop now</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>Visit Our Masterclass</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={'/about'}>Our Natural Ingredients</Link>
                        </ListItem>
                    </List>
                </Container>
            </Container>
        </Container>
    )
}