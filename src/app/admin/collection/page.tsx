'use client'

import { Alert, Box, Button, Container, IconButton, Snackbar, SnackbarCloseReason } from '@mui/material'
import styles from './page.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { addCollection } from '@/app/actions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Loading } from '@/components/Loader/Loading';
import clsx from 'clsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redirect } from "next/navigation"
import imageBlobReduce from 'image-blob-reduce'

interface IFormInputs {
    name: string;
    description: string;
    image: FileList;
}

export default function AddProductPage() {
    const { handleSubmit, reset, register, formState } = useForm<IFormInputs>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const submitHandler: SubmitHandler<IFormInputs> = async (data) => {
        setIsLoading(() => true)

        const compressedImage = await imageBlobReduce().toBlob(data.image[0], { max: 500 })

        addCollection({
            collectionName: data.name,
            collectionDescription: data.description,
            image: compressedImage,
        }).then(() => {
            setMessage('Uploaded successfully')
            reset()
            setIsSuccess(true)
        }).catch(() => {
            setMessage('Smth went wrong! try again')
            setIsSuccess(false)
        }).finally(() => {
            setIsLoading(false)
            setOpen(true)
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Container>
            <Box className={styles.pageHeader}>
                <IconButton onClick={() => redirect('/admin')} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </IconButton>
                <h1>Add Collection</h1>
            </Box>
            <Box component={'form'} className={styles.form} onSubmit={handleSubmit(submitHandler)}>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'name'}>Collection Name</label>
                    <input className={styles.input} {...register('name', { required: true })} />
                    {formState.errors.name && <p className={styles.error}>Required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'description'}>Description</label>
                    <textarea className={styles.textArea} {...register('description', { required: true })} />
                    {formState.errors.description && <p className={styles.error}>Required</p>}
                </div>

                <Button
                    className={styles.fileInput}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload image
                    <input type='file' {...register('image')} style={{
                        clip: 'rect(0 0 0 0)',
                        clipPath: 'inset(50%)',
                        height: 1,
                        overflow: 'hidden',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        whiteSpace: 'nowrap',
                        width: 1,
                    }} />
                </Button>

                <Button type='submit' className={styles.submitBtn}>Add Collection</Button>
            </Box>
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