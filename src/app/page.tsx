'use client'
import { Banner } from "@/components/Banner/Banner";
import { ButtonImage } from "@/components/ButtonImage/ButtonImage";
import { Container, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import Link from "next/link";
import styles from './page.module.scss'
import { useWindowSize } from "@/utils/hooks";

export default function Home() {
  const { width: screenWith } = useWindowSize()
  return (
    <>
      <Container component='section' className={styles.main} sx={{ height: screenWith * 0.968 }}>
      </Container>
      <Banner />
      <Container component='section' className="h-[800px]" sx={{ padding: 0 }}>
        <ImageList gap={10} className="m-[10px] h-full" cols={4}>
          <ImageListItem rows={1} cols={2}>
            <Link href={'/collections'} className="h-[100%]">
              <ButtonImage src="/masterclass.png" />
              <ImageListItemBar title='Masterclass' subtitle='Visit our Masterclass' position="top" />
            </Link>
          </ImageListItem>
          <ImageListItem cols={2} rows={2}>
            <Link href={'/collections'} className="h-[100%]">
              <ButtonImage src="/shop.png" />
              <ImageListItemBar title='Shop Our Candles' subtitle='View Our Products' position="top" />
            </Link>
          </ImageListItem>
          <ImageListItem>
            <Link href={'/special'} className="h-[100%]">
              <ButtonImage src="/special.png" />
              <ImageListItemBar title='Buy Special Supplies' subtitle='View Page' position="top" />
            </Link>
          </ImageListItem>
          <ImageListItem>
            <Link href={'/collections/ingredients'} className="h-[100%]">
              <ButtonImage src="/ingredients.png" />
              <ImageListItemBar title='Our Ingredients' subtitle='Check Information' position="top" />
            </Link>
          </ImageListItem>
        </ImageList>
      </Container>
      <Container component='section' className="h-[800px]">

      </Container>
      <Container component='section' className="h-[1100px]">

      </Container>
      <Container component='section' className="bg-[url(/candlesImg.png)] h-[800px]">

      </Container>
    </>
  );
}

