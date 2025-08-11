'use client'

import { Alert, Box, Button, Container, IconButton, Snackbar, SnackbarCloseReason } from '@mui/material'
import styles from './page.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { addProduct, Collection, getCollections } from '@/app/actions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Loading } from '@/components/Loader/Loading';
import clsx from 'clsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redirect } from "next/navigation"
import { Jimp } from 'jimp';

interface IFormInputs {
    name: string;
    subtitle: string;
    type: string;
    scent: string;
    description: string;
    price: number;
    size: string;
    burnTime: string;
    collection: number;
    image: FileList;
}

export default function AddProductPage() {
    const { handleSubmit, reset, register, formState } = useForm<IFormInputs>()
    const [collections, setCollections] = useState<Collection[]>([])
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

    useEffect(() => {
        setIsLoading(true)
        getCollections().then(data => {
            setCollections(data)
            setIsLoading(false)
        })
    }, [])

    const submitHandler: SubmitHandler<IFormInputs> = async (data) => {
        setIsLoading(() => true)

        const jimpImage = await Jimp.fromBuffer(await data.image[0].arrayBuffer())
        const proportion = jimpImage.height / jimpImage.width
        const compressedImage = await jimpImage
            .resize({
                w: 150 / proportion,
                h: 150
            }).getBase64('image/png')

        const blobResponce = await fetch(compressedImage)
        const blobImage = await blobResponce.blob()

        addProduct({
            productName: data.name,
            burnTime: data.burnTime,
            price: Number(data.price),
            size: data.size,
            collectionId: data.collection,
            productDescription: data.description,
            image: blobImage,
            scent: data.scent,
            productSubTitle: data.subtitle,
            type: data.type
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
                <h1>Add product</h1>
            </Box>
            <Box component={'form'} className={styles.form} onSubmit={handleSubmit(submitHandler)}>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'name'}>Название продукта</label>
                    <input className={styles.input} {...register('name', { required: true })} />
                    {formState.errors.name && <p className={styles.error}>Required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'subtitle'}>Короткое описание продукта</label>
                    <input className={styles.input} {...register('subtitle', { required: true })} />
                    {formState.errors.name && <p className={styles.error}>Required</p>}
                </div>

                <div className={styles.inputAreaWrapper}>
                    <label className={styles.inputLabel} htmlFor={'description'}>Описание</label>
                    <textarea className={styles.textArea} {...register('description', { required: true })} />
                    {formState.errors.description && <p className={styles.error}>Required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'price'}>Цена (в злотых в грошувках)</label>
                    <input
                        type='number'
                        {
                        ...register('price', {
                            pattern: {
                                value: /[0-9]/,
                                message: 'Should be only numbers'
                            },
                            required: 'Required',
                        })
                        }
                        className={styles.input}
                    />
                    {formState.errors.price && <p className={styles.error}>{formState.errors.price.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'type'}>Тип свечи</label>
                    <input className={styles.input} {...register('type', { required: true })} />
                    {formState.errors.type && <p className={styles.error}>Required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'scent'}>Запах/состав</label>
                    <input className={styles.input} {...register('scent', { required: true })} />
                    {formState.errors.scent && <p className={styles.error}>Required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'size'}>Размер</label>
                    <input className={styles.input} {...register('size', { required: true })} />
                    {formState.errors.size && <p className={styles.error}>required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'burnTime'}>Время горения</label>
                    <input className={styles.input} {...register('burnTime', { required: true })} />
                    {formState.errors.burnTime && <p className={styles.error}>required</p>}
                </div>

                <div className={styles.inputSelectWrapper}>
                    <label className={styles.inputLabel} htmlFor={'collection'}>Коллекция</label>
                    <select {...register('collection', { valueAsNumber: true, required: true })} className={styles.inputSelect}>
                        {collections.map(c => {
                            return (
                                <option key={c.id} value={c.id}>{c.collectionName}</option>
                            )
                        })}
                    </select>
                    {formState.errors.burnTime && <p className={styles.error}>required</p>}
                </div>

                <Button
                    className={styles.fileInput}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Загрузить картинку (не более 4,5 мб)
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

                <Button type='submit' className={styles.submitBtn}>Добавить продукт</Button>
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