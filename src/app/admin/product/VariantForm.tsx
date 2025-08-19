import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.scss'
import { Box, Button, Collapse } from '@mui/material';
import { useState } from 'react';
import clsx from 'clsx';
import CheckIcon from '@mui/icons-material/Check';

export interface IVariantFormInputs {
    title: string;
    price: number;
    size: string;
    burnTime: string;
}

export const VariantForm = ({
    setVariant,
    setButtonVisibility
}: {
    setVariant: (data: IVariantFormInputs) => void;
    setButtonVisibility: (visibility: boolean) => void
}) => {
    const { handleSubmit, register, formState } = useForm<IVariantFormInputs>()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const submitVariantHandler: SubmitHandler<IVariantFormInputs> = async (data) => {
        console.log(data)
        setVariant(data)
        setButtonVisibility(true)
        setIsCollapsed(true)
    }
    return (
        <Collapse in={!isCollapsed} collapsedSize={40}>
            <Box component='form' onSubmit={handleSubmit(submitVariantHandler)} className={styles.form}>
                <Box className={clsx(styles.productDescriptionContainer, {
                    [styles.collapsed]: isCollapsed
                })}>
                    <p className={styles.productDescriptionTitle}>Описание</p>
                    {isCollapsed && <CheckIcon color='success' />}
                </Box>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'title'}>Название</label>
                    <input className={styles.input} {...register('title', { required: true })} />
                    {formState.errors.title && <p className={styles.error}>required</p>}
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
                    <label className={styles.inputLabel} htmlFor={'size'}>Размер</label>
                    <input className={styles.input} {...register('size', { required: true })} />
                    {formState.errors.size && <p className={styles.error}>required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'burnTime'}>Время горения</label>
                    <input className={styles.input} {...register('burnTime', { required: true })} />
                    {formState.errors.burnTime && <p className={styles.error}>required</p>}
                </div>
                <Button type='submit' className={styles.submitBtn}>Готово</Button>
            </Box>
        </Collapse >
    )
}