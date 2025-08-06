import { IItem } from "@/app/mocks/indes";
import { Box } from "@mui/material"
import { ProductCarousel } from "../ProductCarousel/ProductCarousel";
import styles from './Collection.module.scss'

export interface ICollection {
    title: string;
    content: string;
    products: IItem[]
}

export const Collection = ({ title, content, products }: ICollection) => {
    return (
        <Box className={styles.wrapper}>
            <p className={styles.title}>{title}</p>
            <p className={styles.content}>{content}</p>
            <ProductCarousel products={products} withPrice={false} />
        </Box>
    )
}