import { IItem } from '@/app/mocks/indes'
import { convertPrice } from '@/utils/utils'
import { Box } from '@mui/material'
import Link from 'next/link'
import styles from './ProductCarousel.module.scss'

export const ProductCarousel = ({ products, withPrice = true }: { products: IItem[], withPrice?: boolean }) => {
    return (
        <Box className={styles.relatedWrapper}>
            <Box className={styles.relatedList}>
                {
                    products.map(el => {
                        return (
                            <Link href={`/product/${el.id}`} key={el.id} className={styles.relatedProductContainer} >
                                <Box className={styles.productImg} sx={{ backgroundImage: `url(${el.imgUrl})` }} />
                                <p className={styles.relatedProductName}>{el.title}</p>
                                {withPrice && <p className={styles.relatedProductPrice}>{convertPrice(el.price)}</p>}
                            </Link>
                        )
                    })
                }
            </Box>
        </Box>
    )
}
