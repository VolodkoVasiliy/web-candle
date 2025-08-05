import { Box, Container } from "@mui/material"
import styles from './Social.module.scss'
import clsx from 'clsx'
import Image from "next/image"
import Link from "next/link"
export const Social = () => {
    return (
        <Container className={styles.container}>
            <Link href='instagram://user?username=inner_light__' className={clsx(styles.media)}>
                <Image src={'/new/contacts/instagram.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Instagram</p>
                    <p className={styles.subtitle}>12.5K Followers</p>
                </Box>
            </Link>

            <Link href='http://www.facebook.com/pages/inner_light' target="_blank" className={clsx(styles.media)}>
                <Image src={'/new/contacts/facebook.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Facebook</p>
                    <p className={styles.subtitle}>8.2K Likes</p>
                </Box>
            </Link>

            <Link href='mailto:inner.light.wroclaw@gmail.com' target="_blank" className={clsx(styles.media)}>
                <Image src={'/new/contacts/mail.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Email: Support@inner-light.pl</p>
                </Box>
            </Link>

            <Link href='tel:+48555' target="_blank" className={clsx(styles.media)}>
                <Image src={'/new/contacts/phone.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>+48 555 666 777</p>
                </Box>
            </Link>
        </Container>
    )
}