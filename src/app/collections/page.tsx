import { Box, Container } from "@mui/material";
import styles from './page.module.scss'
import { mockShopData } from "../mocks/indes";
import { convertPrice } from "@/utils/utils";
import Link from "next/link";

export default function CollectionsPage() {
    return (
        <Container>
            <h1 className={styles.pageTitle}>Inner Light</h1>
            <Box className={styles.productList}>
                {
                    mockShopData.map(el => {
                        return (
                            <Link className={styles.product} key={el.id} href={`/product/${el.id}`}>
                                <Box className={styles.productImg} sx={{ backgroundImage: `url(${el.imgUrl})` }} />
                                <p className={styles.productTitle}>{el.title}</p>
                                <p className={styles.productSubtitle}>{el.subtitle}</p>
                                <p className={styles.productPrice}>{convertPrice(el.price)}</p>
                            </Link>
                        )
                    })
                }
            </Box>
        </Container>
    )
}