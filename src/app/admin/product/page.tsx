'use client'

import { Alert, Box, Button, Container, IconButton, Snackbar, SnackbarCloseReason } from '@mui/material'
import styles from './page.module.scss'
import { useState } from 'react';
import { addProduct } from '@/app/actions';
import { Loading } from '@/components/Loader/Loading';
import clsx from 'clsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redirect } from "next/navigation"
import { IVariantFormInputs, VariantForm } from './VariantForm';
import { DescriptionForm, IDescriptionFormInputs } from './DescriptionForm';

export default function AddProductPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)
    const [variants, setVariants] = useState<IVariantFormInputs[]>([])
    const [varianFormList, setVarianFormList] = useState<number[]>([])
    const [buttonVisibility, setButtonVisibility] = useState(false)
    const [mainDescription, setMainDescription] = useState<IDescriptionFormInputs | null>(null)
    const [resizedImage, setResizedImage] = useState<Blob | null>(null)

    const reset = () => {
        setVariants([])
        setVarianFormList([])
        setButtonVisibility(false)
        setMainDescription(null)
        setResizedImage(null)
    }

    const handleAddProduct = async () => {
        if (!mainDescription || variants.length === 0 || !resizedImage) {
            return;
        }

        try {
            setIsLoading(true)
            await addProduct(
                {
                    productName: mainDescription.name,
                    scent: mainDescription.scent,
                    type: mainDescription.type,
                    collectionId: mainDescription.collection,
                    productDescription: mainDescription.description
                },
                resizedImage,
                variants.map(v => ({
                    burnTime: v.burnTime,
                    price: Number(v.price),
                    size: v.size,
                    title: v.title,
                }))
            )
            setMessage('Загружено!')
            setIsSuccess(true)
            reset()
        } catch {
            setMessage('Черти сломали мервер')
            setIsSuccess(false)
        } finally {
            setIsLoading(false)
            setOpen(true)
        }

    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <Container className={styles.container}>
            <Box className={styles.pageHeader}>
                <IconButton onClick={() => redirect('/admin')} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </IconButton>
                <h1>Add product</h1>
            </Box>
            <DescriptionForm
                setButtonVisibility={setButtonVisibility}
                setMainDescription={setMainDescription}
                setResizedImage={setResizedImage}
            />

            {
                varianFormList
                    .map(
                        (_el, index) =>
                            <VariantForm
                                key={index}
                                setButtonVisibility={setButtonVisibility}
                                setVariant={
                                    (newVariant) => {
                                        setVariants(prev => [...prev, newVariant])
                                    }
                                }
                            />
                    )
            }
            {
                buttonVisibility &&
                <Button
                    className={styles.submitBtn}
                    onClick={() => {
                        setVarianFormList(prev => [...prev, prev.length + 1])
                        setButtonVisibility(false)
                    }}
                >
                    Добавить варинт
                </Button>
            }

            {
                mainDescription && variants.length > 0 && buttonVisibility &&
                <Button onClick={handleAddProduct} className={clsx(styles.submitBtn, styles.finishBtn)}>Добавить продукт</Button>
            }

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                className={clsx({
                    [styles.snackSuccsess]: isSuccess,
                    [styles.snakError]: isSuccess
                })}
            >
                <Alert
                    onClose={handleClose}
                    severity={isSuccess ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}