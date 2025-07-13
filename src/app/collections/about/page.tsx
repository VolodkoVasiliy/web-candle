import { Container, ImageList, ImageListItem } from "@mui/material";
import styles from './page.module.scss'
import Image from "next/image";
import { Feedback, FeedbackProps } from "@/components/Feedback/Feedback";
import { TextWithDivider } from "@/components/TextWithDivider/TextWithDivider";

const mockFeedbacks: Array<FeedbackProps & { id: string }> = [
    {
        id: '1',
        title: 'Anna',
        content: 'The scents are enchanting and the attention to detail is remarkable. My home has been transformed into a haven.',
        stars: 5
    },
    {
        id: '2',
        title: 'Tomas',
        content: 'Was gifted a box for the first time. It was pretty clear I was addicted and since then I have subscribed.',
        stars: 5
    },
    {
        id: '3',
        title: 'Geralt',
        content: `The entire shopping experience was seamless, and I'm already looking forward to my next purchase. Thank you for touch of magic!`,
        stars: 5
    }
]

export default function AboutPage() {
    return (
        <Container className="mt-[40px]">
            <Container maxWidth='md' className={styles.textContainer}>
                <TextWithDivider>
                    {`Welcome to Liminous Nature, where passion and craftsmanship converge to create exquisite candles that illuminate your world. With a commitment to quality and innovation, we take pride in curating a diverse range of candles that transform spaces into sanctuaries. Our journey began with a simple idea: to infuse elegance and enchantment into everyday moments. Through meticulous attention to detail and a dedication to using the finest materials, we've grown into a beacon of creativity in the world of candle making.`}
                </TextWithDivider>
            </Container>
            <Container maxWidth='md' className={styles.textContainer}>
                <TextWithDivider>
                    {`Our team of passionate artisans pours their heart into each creation, ensuring that every candle tells a story. Whether it's the warm glow that fills your living room or the soothing aroma that welcomes you home, we're dedicated to crafting candles that resonate with your senses and enhance your well-being.
                    Thank you for joining us on this journey. Explore our collection and let our candles be the enchanting thread that weaves through the fabric of your life.`}
                </TextWithDivider>
            </Container>
            <Container maxWidth='lg' className={styles.feedbackBlock}>
                <Container>
                    <ImageList cols={4} className="h-[350px]" gap={10}>
                        <ImageListItem cols={1} rows={2}>
                            <Image src={'/about/image1.png'} fill={true} alt="img1" />
                        </ImageListItem>
                        <ImageListItem cols={2} rows={2}>
                            <Image src={'/about/image3.png'} fill={true} alt="img2" />
                        </ImageListItem>
                        <ImageListItem cols={1} rows={1}>
                            <Image src={'/about/image2.png'} fill={true} alt="img1" />
                        </ImageListItem>
                        <ImageListItem cols={1} rows={1}>
                            <Image src={'/about/image4.png'} fill={true} alt="img1" />
                        </ImageListItem>
                    </ImageList>
                </Container>
                <Container className={styles.feedbackContainer} maxWidth={'lg'}>
                    {mockFeedbacks.map(fb => <Feedback key={fb.id} {...fb} />)}
                </Container>
            </Container>
        </Container>
    )
}