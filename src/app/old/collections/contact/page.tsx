'use client'
import { Box, Button, Container, TextField } from "@mui/material";
import styles from './page.module.scss'
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
    name: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
}

export default function ContactPage() {
    const { handleSubmit, control } = useForm<IFormInputs>({
        defaultValues: {
            name: '',
            lastName: '',
            phone: '',
            email: '',
            message: ''
        }
    })

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data)
    }
    return (
        <Container>
            <Box component={'form'} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => {
                        return <TextField {...field} error={fieldState.invalid} helperText='Name is requiered' className={styles.input} label="Name" variant="standard" />
                    }}
                />
                <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => {
                        return <TextField {...field} className={styles.input} label="Last name" variant="standard" />
                    }}
                />
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => {
                        return <TextField {...field} error={fieldState.invalid} helperText='Name is requiered' className={styles.input} label="phone" variant="standard" />
                    }}
                />
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => {
                        return <TextField {...field} error={fieldState.invalid} helperText='Name is requiered' className={styles.input} label="Email" variant="standard" />
                    }}
                />
                <Controller
                    name="message"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => {
                        return <TextField {...field} label="Message" rows={5} className={styles.inputMsg} multiline variant="standard" />
                    }}
                />
                <Button className={styles.submitBtn} type="submit">Submit</Button>
            </Box>
        </Container>
    )
}