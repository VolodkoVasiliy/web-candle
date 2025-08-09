import { Box } from '@mui/material'
import Link from 'next/link'
import styles from './ProductCarousel.module.scss'
import { Product } from '@/app/actions'

export const ProductCarousel = ({ products, withPrice = true }: { products: Product[], withPrice?: boolean }) => {
    return (
        <Box className={styles.relatedWrapper}>
            <Box className={styles.relatedList}>
                {
                    products.map(el => {
                        return (
                            <Link href={`/product/${el.id}`} key={el.id} className={styles.relatedProductContainer} >
                                <Box className={styles.productImg} sx={{ backgroundImage: `url(${el.imageUrl})` }} />
                                <p className={styles.relatedProductName}>{el.productName}</p>
                                {withPrice && <p className={styles.relatedProductPrice}>{el.price} zl</p>}
                            </Link>
                        )
                    })
                }
            </Box>
        </Box>
    )
}
