import { TextWithDivider } from "@/components/TextWithDivider/TextWithDivider";
import { Box, Container, Divider, ImageList, ImageListItem, List, ListItem } from "@mui/material";
import styles from './page.module.scss'
import Image from "next/image";

export default function IngredientsPage() {
    return (
        <Container className="mb-[50px] mt-[40px]">
            <Container maxWidth='md' className={styles.textContainer}>
                <TextWithDivider>
                    {` Our commitment to quality extends to every aspect of our candles, right down to the wick. We use cotton wicks that promote a steady, even burn, ensuring that the fragrance and warmth envelop your surroundings in an exquisite embrace. We invite you to explore our collection and experience the genuine beauty that nature's finest ingredients bring to each of our candles.`}
                </TextWithDivider>
            </Container>
            <Container maxWidth='md' className={styles.textContainer}>
                <TextWithDivider>
                    {`Our commitment to quality extends to every aspect of our candles, right down to the wick. We use cotton wicks that promote a steady, even burn, ensuring that the fragrance and warmth envelop your surroundings in an exquisite embrace. We invite you to explore our collection and experience the genuine beauty that nature's finest ingredients bring to each of our candles.`}
                </TextWithDivider>
            </Container>
            <Container maxWidth='lg' className={styles.dividerBlock}></Container>
            <Container maxWidth='lg' className={styles.ingredientsContainer}>
                <ImageList className={styles.imageList} gap={10} cols={2}>
                    <ImageListItem rows={2} cols={2}>
                        <Image src={'/ingredients/img1.png'} alt="img1" fill={true} />
                    </ImageListItem>
                    <ImageListItem rows={2} cols={1}>
                        <Image src={'/ingredients/img2.png'} alt="img2" fill={true} />
                    </ImageListItem>
                    <ImageListItem rows={1} cols={1}>
                        <Image src={'/ingredients/img3.png'} alt="img3" fill={true} />
                    </ImageListItem>
                    <ImageListItem rows={1} cols={1}>
                        <Image src={'/ingredients/img4.png'} alt="img4" fill={true} />
                    </ImageListItem>
                </ImageList>
                <Box>
                    <Box className={styles.ingredientsWrapper}>
                        <p className={styles.title}>Crafting Each Candle: Our Artisanal Process</p>
                        <Divider className="w-[50%]" />
                        <List className={styles.list}>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>1.</p>
                                <p>{`Ingredients: We meticulously select premium natural ingredients, crafting fragrance blends from essential oils that capture nature's essence.`}</p>
                            </ListItem>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>2.</p>
                                <p>{`Wax Blend: Sustainably sourced soy and beeswax blend for a clean, eco-friendly burn that envelopes your space in captivating aroma.`}</p>
                            </ListItem>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>3.</p>
                                <p>{`Hand-Poured: Skilled artisans hand-pour each candle, infusing a personal touch and uniqueness into every creation`}.</p>
                            </ListItem>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>4.</p>
                                <p>Wick Excellence: Cotton wicks are chosen for consistent, even burns, enhancing the overall experience.</p>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Container>
            <Container maxWidth='lg' className={styles.ingredientsContainer}>
                <Box>
                    <Box className={styles.ingredientsWrapper}>
                        <Divider className="w-[50%]" />
                        <List className={styles.list}>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>1.</p>
                                <p>A Symphony of Fragrance: Our candles are not just products; they are harmonious compositions that inspire and elevate the senses.</p>
                            </ListItem>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>2.</p>
                                <p>Moments Transformed: From serene evenings to celebratory occasions, our candles elevate every moment with their radiance and aroma.</p>
                            </ListItem>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>3.</p>
                                <p>Environmental Harmony: Our commitment to sustainability ensures that every aspect of our candles respects and preserves the environment.</p>
                            </ListItem>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>4.</p>
                                <p>Creating Connections: Each candle is an invitation to connect with nature and immerse yourself in its beauty.</p>
                            </ListItem>
                            <ListItem alignItems={'flex-start'} className={styles.listItem}>
                                <p>5.</p>
                                <p>Artisanal Illumination: Welcome to [Your Company Name], where we craft candles that embody the true art of illumination.</p>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
                <ImageList className={styles.imageList} cols={2} gap={10}>
                    <ImageListItem rows={2} cols={1}>
                        <Image src={'/ingredients/img5.png'} alt="img5" fill={true} />
                    </ImageListItem>
                    <ImageListItem rows={1} cols={1}>
                        <Image src={'/ingredients/img6.png'} alt="img6" fill={true} />
                    </ImageListItem>
                    <ImageListItem rows={1} cols={1}>
                        <Image src={'/ingredients/img7.png'} alt="img7" fill={true} />
                    </ImageListItem>
                    <ImageListItem rows={2} cols={2}>
                        <Image src={'/ingredients/img8.png'} alt="img8" fill={true} />
                    </ImageListItem>
                </ImageList>
            </Container>
        </Container>
    )
}