import { Box } from "@mui/material"
import { ProductCarousel } from "../ProductCarousel/ProductCarousel";
import styles from './Collection.module.scss'
import { Collection as CollectionType, Product } from "@/app/actions";

export interface ICollection extends CollectionType {
    products: Product[]
}

export const Collection = ({ collectionName, collectionDescription, products }: ICollection) => {
    return (
        <Box className={styles.wrapper}>
            <p className={styles.title}>{collectionName}</p>
            <p className={styles.content}>{collectionDescription}</p>
            <ProductCarousel products={products} withPrice={false} />
        </Box>
    )
}