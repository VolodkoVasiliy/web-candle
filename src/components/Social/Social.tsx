import { Box, Container } from "@mui/material"
import styles from './Social.module.scss'
import clsx from 'clsx'
import Image from "next/image"
export const Social = () => {
    return (
        <Container className={styles.container}>
            <Box className={clsx(styles.media)}>
                <Image src={'/new/contacts/instagram.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Instagram</p>
                    <p className={styles.subtitle}>12.5K Followers</p>
                </Box>
            </Box>

            <Box className={clsx(styles.media)}>
                <Image src={'/new/contacts/facebook.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Facebook</p>
                    <p className={styles.subtitle}>8.2K Likes</p>
                </Box>
            </Box>

            <Box className={clsx(styles.media)}>
                <Image src={'/new/contacts/mail.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>Email: Support@inner-light.pl</p>
                </Box>
            </Box>

            <Box className={clsx(styles.media)}>
                <Image src={'/new/contacts/phone.png'} alt="instagram" width={48} height={48} />
                <Box>
                    <p className={styles.title}>+48 555 666 777</p>
                </Box>
            </Box>
        </Container>
    )
}