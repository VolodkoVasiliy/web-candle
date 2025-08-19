'use client'

import { Box, Container } from "@mui/material";
import styles from './page.module.scss'
import { useWindowSize } from "@/utils/hooks";
import { Review } from "@/components/Review/Review";
import { reviews } from "./mocks/indes";
import { Social } from "@/components/Social/Social";
import { Collection } from "./actions";

export default function HomeComponent({ collections }: { collections: Collection[] }) {
    const { width: screenWith } = useWindowSize()
    return (
        <Container maxWidth='sm'>
            <Box sx={{
                backgroundImage: `url(/new/landing/picture1.png)`,
                width: '100%',
                height: `${screenWith * 0.82}px`,
                backgroundSize: 'cover'
            }}></Box>
            <h1 className={styles.title}>Handmade Soy Wax Candles</h1>
            <p className={styles.subtitle}>Discover our unique collections, each crafted with care and designed to bring warmth and tranquility to your space.</p>
            <Container className={styles.collectionsWrapper}>
                <div className={styles.collectionsList}>
                    {
                        collections.map(col => {
                            return (
                                <Box sx={{ width: 'max-content' }} key={col.collectionName}>
                                    <Box className={styles.img} sx={{ height: 240, backgroundImage: `url(${col.imageUrl})`, backgroundRepeat: 'none', backgroundSize: 'cover' }} />

                                    <p className={styles.collectionName}>Collection {col.collectionName}</p>
                                </Box>
                            )
                        })
                    }
                </div>
            </Container>
            <Container>
                <p className={styles.reviewTitle}>Customers Reviews</p>
                {
                    reviews.map((el, i) => {
                        return (
                            <Review {...el} key={`${el.name}+${i}`} />
                        )
                    })
                }
            </Container>
            <Container>
                <p className={styles.connectTitle}>Connect With Us</p>
                <Social />
            </Container>
            <Container className={styles.copyrights}>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>© 2025 Inner Light. All rights reserved. 123 Candlelight Lane, Harmony, CA</p>
            </Container>
        </Container>
    );
}

