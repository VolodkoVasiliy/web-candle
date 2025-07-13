'use client'

import { ButtonImage } from "@/components";
import { Button, Container, ImageList, ImageListItem, Typography } from "@mui/material";
import Link from "next/dist/client/link";
import styles from './page.module.scss'

export default function ColellectionPage() {
    return (
        <>
            <Container className="h-full">
                <ImageList gap={40} cols={4}>
                    <ImageListItem>
                        <Link href='/collections/unique' className="h-[400px]">
                            <ButtonImage src="/collectionsPage/candle.png">
                                <Typography variant="h2" className={styles.itemBarTitle}>Candles</Typography>
                            </ButtonImage>
                        </Link>
                    </ImageListItem>
                    <ImageListItem>
                        <Link href='/collections/unique' className="h-[400px]">
                            <ButtonImage src="/collectionsPage/heads.png">
                                <Typography variant="h2" className={styles.itemBarTitle}>Unique Collection</Typography>
                            </ButtonImage>
                        </Link>
                    </ImageListItem>
                    <ImageListItem>
                        <Link href='/collections/unique' className="h-[400px]">
                            <ButtonImage src="/collectionsPage/sticks.png">
                                <Typography variant="h2" className={styles.itemBarTitle}>Accessories</Typography>
                            </ButtonImage>
                        </Link>
                    </ImageListItem>
                    <ImageListItem>
                        <Link href='/collections/unique' className="h-[400px]">
                            <ButtonImage src="/collectionsPage/tools.png">
                                <Typography variant="h2" className={styles.itemBarTitle}>Special Supplies</Typography>
                            </ButtonImage>
                        </Link>
                    </ImageListItem>
                </ImageList>
            </Container>
            <Container className="mt-[136px] h-[800px] bg-[url(/collectionsPage/bottomBG.png)] flex flex-col items-center">
                <Typography variant="h2" className="w-[420px] text-center pt-[150px]">Illuminate & Create The Candle Making Masterclass Experience</Typography>
                <Typography variant="h3" className="w-[850px] pt-[40px] text-center">Unlock the art of candle making through our immersive masterclass. Discover the secrets behind crafting exquisite candles from scratch, as our experienced artisans guide you through each step of the process.</Typography>
                <Button sx={{
                    backgroundColor: '#DDA15E',
                    marginTop: '100px'
                }} className="w-[200px] h-[50px]">
                    <Typography variant="h3">Book</Typography>
                </Button>
            </Container>
        </>
    )
}