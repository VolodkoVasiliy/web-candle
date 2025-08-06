import { Box, Container } from "@mui/material"
import styles from './Social.module.scss'
import clsx from 'clsx'
import Image from "next/image"
import Link from "next/link"
export const Social = () => {
    return (
        <Container className={styles.container}>
            <Link href='instagram://user?username=inner_light___' className={clsx(styles.media)}>
                <Image src={'/new/contacts/instagram.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Instagram</p>
                    <p className={styles.subtitle}>12.5K Followers</p>
                </Box>
            </Link>

            <Link href='http://www.facebook.com/people/Inner-Light/61578233135700/' target="_blank" className={clsx(styles.media)}>
                <Image src={'/new/contacts/facebook.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Facebook</p>
                    <p className={styles.subtitle}>8.2K Likes</p>
                </Box>
            </Link>

            <Link href='mailto:inner.light.wroclaw@gmail.com' target="_blank" className={clsx(styles.media)}>
                <Image src={'/new/contacts/mail.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Email</p>
                    <p className={styles.subtitle}>support@inner-light.pl</p>
                </Box>
            </Link>

            <Link href='tel:+48 513 320 517' target="_blank" className={clsx(styles.media)}>
                <Image src={'/new/contacts/phone.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Phone</p>
                    <p className={styles.subtitle}>+48 513 320 517</p>
                </Box>
            </Link>
        </Container>
    )
}