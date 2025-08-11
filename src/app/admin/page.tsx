import { Box, Container, IconButton } from '@mui/material'
import styles from './page.module.scss'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redirect } from "next/navigation"

export default function AdminPage() {
    return (
        <Container className={styles.container}>
            <Box className={styles.pageHeader}>
                <Link href={'/cart'} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </Link>
                <h1>Addmin panel</h1>
            </Box>
            <p className={styles.productTitle}>Manage Products</p>
            <Link className={styles.link} href={'/admin/product'}>Add New Product</Link>
            <Link className={styles.link} href={'/admin/editProduct'}>Edit Existing Product</Link>
            <p className={styles.collectionsTitle}>Manage Collections</p>
            <Link className={styles.link} href={'/admin/collection'}>Create New Collection</Link>
            <Link className={styles.link} href={'/admin/editCollection'}>Edit Existing Collection</Link>
        </Container>
    )
}
