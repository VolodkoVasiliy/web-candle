'use client'

import { Box, Container, IconButton } from '@mui/material'
import styles from './page.module.scss'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation"

export default function AdminPage() {
    const router = useRouter();

    return (
        <Container className={styles.container}>
            <Box className={styles.pageHeader}>
                <IconButton onClick={() => router.back()} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </IconButton>
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
