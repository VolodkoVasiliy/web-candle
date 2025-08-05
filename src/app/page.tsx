'use client'

import { Box, Container } from "@mui/material";
import styles from './page.module.scss'
import { useWindowSize } from "@/utils/hooks";
import Image from "next/image";
import { Review } from "@/components/Review/Review";
import { reviews } from "./mocks/indes";
import { Social } from "@/components/Social/Social";

export default function Home() {
  const { width: screenWith } = useWindowSize()
  return (
    <Container maxWidth='sm'>
      <Box sx={{
        backgroundImage: `url(/new/landing/picture1.png)`,
        width: '100dvw',
        height: `${screenWith * 0.82}px`,
        backgroundSize: 'cover'
      }}></Box>
      <h1 className={styles.title}>Handmade Soy Wax Candles</h1>
      <p className={styles.subtitle}>Discover our unique collections, each crafted with care and designed to bring warmth and tranquility to your space.</p>
      <Container className={styles.collectionsWrapper}>
        <div className={styles.collectionsList}>
          {
            [1, 2, 3, 4, 5].map(el => {
              return (
                <Box sx={{ width: 'max-content' }} key={el}>
                  <Image src='/new/landing/collection.png' width={240} height={240} alt="sample" />
                  <p className={styles.collectionName}>Collection {el}</p>
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

