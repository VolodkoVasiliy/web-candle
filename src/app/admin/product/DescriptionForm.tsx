import { Collapse, Button, Box } from "@mui/material"
import clsx from "clsx"
import CheckIcon from '@mui/icons-material/Check';
import { SubmitHandler, useForm } from "react-hook-form";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import styles from './page.module.scss'
import { Collection, getCollections } from "@/app/actions";
import { Jimp } from "jimp";
import { Loading } from "@/components/Loader/Loading";

export interface IDescriptionFormInputs {
    name: string;
    subtitle: string;
    type: string;
    scent: string;
    description: string;
    collection: number;
    image: FileList;
}

export const DescriptionForm = (
    {
        setButtonVisibility,
        setMainDescription,
        setResizedImage
    }:
        {
            setButtonVisibility: (visibility: boolean) => void;
            setMainDescription: (data: IDescriptionFormInputs) => void;
            setResizedImage: (image: Blob) => void
        }
) => {
    const { handleSubmit, register, formState } = useForm<IDescriptionFormInputs>()
    const [collections, setCollections] = useState<Collection[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [mainSectionFilled, setMainSectionFilled] = useState<boolean>(false)

    const fileResizer = async (e?: File) => {
        if (!e) {
            return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = e.target?.result;

            if (!data || !(data instanceof ArrayBuffer)) {
                return;
            }

            // Manipulate images uploaded directly from the website.
            const image = await Jimp.fromBuffer(data);

            const proportion = image.height / image.width
            const compressedImage = await image
                .resize({
                    w: 1000 / proportion,
                    h: 1000
                }).getBase64('image/jpeg')

            const blobResponce = await fetch(compressedImage)
            const blobImage = await blobResponce.blob()


            setResizedImage(blobImage);
        };

        reader.readAsArrayBuffer(e);
    }

    useEffect(() => {
        setIsLoading(true)
        getCollections().then(data => {
            setCollections(data)
            setIsLoading(false)
        })
    }, [])

    const submitDescriptionHandler: SubmitHandler<IDescriptionFormInputs> = async (data) => {
        setIsLoading(true)
        await fileResizer(data.image[0])
        setMainSectionFilled(true)
        setButtonVisibility(true)
        setMainDescription(data)
        setIsLoading(false)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Collapse in={!mainSectionFilled} collapsedSize={40}>
            <Box component={'form'} className={styles.form} onSubmit={handleSubmit(submitDescriptionHandler)}>
                <Box className={clsx(styles.productDescriptionContainer, {
                    [styles.collapsed]: mainSectionFilled
                })}>
                    <p className={styles.productDescriptionTitle}>Описание</p>
                    {mainSectionFilled && <CheckIcon color='success' />}
                </Box>
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
                    <label className={styles.inputLabel} htmlFor={'type'}>Тип свечи</label>
                    <input className={styles.input} {...register('type', { required: true })} />
                    {formState.errors.type && <p className={styles.error}>Required</p>}
                </div>

                <div className={styles.inputWrapper}>
                    <label className={styles.inputLabel} htmlFor={'scent'}>Запах/состав</label>
                    <input className={styles.input} {...register('scent', { required: true })} />
                    {formState.errors.scent && <p className={styles.error}>Required</p>}
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
                    {formState.errors.collection && <p className={styles.error}>required</p>}
                </div>


                <Button
                    className={styles.fileInput}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Загрузить картинку
                    <input
                        type='file'
                        {...register('image')}
                        required style={{
                            clip: 'rect(0 0 0 0)',
                            clipPath: 'inset(50%)',
                            height: 1,
                            overflow: 'hidden',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            whiteSpace: 'nowrap',
                            width: 1,
                        }}
                    />
                </Button>


                <Button type='submit' className={styles.submitBtn}>Готово</Button>
            </Box>
        </Collapse>
    )
}