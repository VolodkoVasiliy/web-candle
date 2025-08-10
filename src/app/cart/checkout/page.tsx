'use client'

import { placeOrder } from '@/app/actions';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.scss'
import { IconButton, Button, Snackbar, Alert, Container, Box, SnackbarCloseReason } from '@mui/material';
import clsx from 'clsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redirect, useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { selectCart } from '@/store/cart/cartSlice';
import { Loading } from '@/components/Loader/Loading';

interface IFormInputs {
    name: string;
    city: string;
    address: string;
    zipCode: string;
    phone: string;
}

export default function CheckoutPage() {
    const { handleSubmit, register, formState } = useForm<IFormInputs>()
    const router = useRouter();
    const { products } = useAppSelector(selectCart)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)

    const submitHandler: SubmitHandler<IFormInputs> = async (data) => {
        let url: string | null = null
        try {
            setIsLoading(true)
            url = await placeOrder({
                address: data.address,
                city: data.city,
                name: data.name,
                phone: data.phone,
                zipCode: data.zipCode ?? undefined
            }, products)

        } catch (e) {
            console.log(e)
            setIsLoading(false)
            setMessage('Smth went wron. try again')
            setIsSuccess(false)
            setOpen(true)
        } finally {
            if (url) {
                redirect(url)
            }
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
        <Container>
            <Box className={styles.pageHeader}>
                <IconButton onClick={() => router.back()} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </IconButton>
                <h1>Checkout</h1>
            </Box>
            <Box component={'form'} className={styles.form} onSubmit={handleSubmit(submitHandler)}>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'name'}>Full name</label>
                    <input className={styles.input} {...register('name', { required: 'Required' })} />
                    {formState.errors.name && <p className={styles.error}>{formState.errors.name.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'city'}>City</label>
                    <input className={styles.input} {...register('city', { required: 'Required' })} />
                    {formState.errors.city && <p className={styles.error}>{formState.errors.city.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'address'}>Address</label>
                    <input className={styles.input} {...register('address', { required: 'Required' })} />
                    {formState.errors.address && <p className={styles.error}>{formState.errors.address.message}</p>}
                </div>


                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'zipCode'}>Zip code</label>
                    <input
                        className={styles.input}
                        {...register('zipCode', {
                            pattern: {
                                value: /\d{2}-\d{3}$/,
                                message: 'Wrong zip code'
                            }
                        })}
                    />
                    {formState.errors.zipCode && <p className={styles.error}>{formState.errors.zipCode.message}</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'phone'}>Phone</label>
                    <input
                        type='number'
                        className={styles.input}
                        {...register('phone', {
                            required: 'Required',
                            pattern: {
                                value: /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/,
                                message: 'Wrong phone number'
                            }
                        })}
                    />
                    {formState.errors.phone && <p className={styles.error}>{formState.errors.phone.message}</p>}
                </div>
                <Button type='submit' className={styles.checkoutButton}>Place Order</Button>
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