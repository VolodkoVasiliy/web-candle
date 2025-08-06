'use client'
import { mockCollections } from "@/app/mocks/indes";
import { Collection } from "@/components/Collection/Collection";
import { Container } from "@mui/material";
import styles from './page.module.scss'

export default function CollectionPage2() {
    return (
        <Container className={styles.container}>
            {
                mockCollections.map(collection => <Collection key={collection.id} {...collection} />)
            }
        </Container>
    )
}
