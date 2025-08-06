import { Avatar, Box, Container } from '@mui/material'
import styles from './page.module.scss'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <Container className={styles.container}>
            <p className={styles.title}>Our Story</p>
            <p className={styles.story}>At Inner Light, we believe in the power of handcrafted goods to bring warmth and tranquility into your home. Our journey began with a simple desire: to create candles that not only illuminate spaces but also evoke emotions and memories. Each candle is a testament to our commitment to quality, sustainability, and the art of slow living.</p>
            <p className={styles.valuesTitle}>Our Values</p>
            <Box className={styles.values}>
                <Box className={styles.valueItem}>
                    <Image src={'/new/about/leaf.png'} width={48} height={48} alt='leaf' />
                    <Box className={styles.valueTextBlock}>
                        <p className={styles.valueTitle}>Sustainable Materials</p>
                        <p className={styles.valueContent}>We use 100% natural soy wax, ensuring a clean and eco-friendly burn.</p>
                    </Box>
                </Box>
                <Box className={styles.valueItem}>
                    <Image src={'/new/about/hand.png'} width={48} height={48} alt='hand' />
                    <Box className={styles.valueTextBlock}>
                        <p className={styles.valueTitle}>Handcrafted with Care</p>
                        <p className={styles.valueContent}>Every candle is meticulously hand-poured in small batches to maintain the highest quality.</p>
                    </Box>
                </Box>
                <Box className={styles.valueItem}>
                    <Image src={'/new/about/poution.png'} width={48} height={48} alt='poution' />
                    <Box className={styles.valueTextBlock}>
                        <p className={styles.valueTitle}>Unique Fragrances</p>
                        <p className={styles.valueContent}>Our fragrances are carefully selected to create unique and captivating sensory experiences.</p>
                    </Box>
                </Box>
            </Box>
            <p className={styles.founderTitle}>Meet the Founder</p>
            <Box className={styles.founderBlock}>
                <Avatar className={styles.avatar} src='/new/about/lena.jpeg' />
                <Box className={styles.founderInfo}>
                    <p className={styles.founderName}>Lena Hryhorieva</p>
                    <p className={styles.founderBio}>Founder & Artisan</p>
                </Box>
            </Box>
            <p className={styles.founderStory}>Lena Hryhorieva's passion for candle making ignited during a period of personal reflection. Seeking solace and creativity, she began experimenting with natural materials and fragrances, eventually leading to the birth of Inner Light. Her vision is to create candles that not only illuminate spaces but also inspire moments of peace and mindfulness.</p>
            <p className={styles.workshopTitle}>Our Workshop</p>
            <Box className={styles.workshopContainer}></Box>
        </Container>
    )
}