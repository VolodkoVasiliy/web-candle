'use client'

import { Box, Button, Container, Input, Link, TextField } from "@mui/material";
import styles from './page.module.scss'
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const MAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?: \.[a - z0 - 9!#$ %& '*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const NAME_REGEXP = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/

export default function ContactPage() {
    const [name, setName] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [msg, setMsg] = useState<string>('')
    const [nameError, setNameError] = useState<boolean>(false)
    const [mailError, setMailError] = useState<boolean>(false)
    const [msgError, setMsgError] = useState<boolean>(false)

    const resetState = () => {
        setName('')
        setMail('')
        setMsg('')
        setMailError(false)
        setMsgError(false)
        setNameError(false)
    }

    const validate = () => {
        let isError = false;
        if (!NAME_REGEXP.test(name)) {
            setNameError(true)
            isError = true;
        }

        if (!MAIL_REGEXP.test(mail)) {
            setMailError(true)
            isError = true;
        }

        if (!msg) {
            setMsgError(true)
            isError = true;
        }

        return isError;
    }

    const handleSubmit = () => {
        if (validate()) {
            return;
        }
        resetState()
    }

    return (
        <Container className={styles.container}>
            <p className={styles.title}>Get in touch</p>
            <p className={styles.contactInfo}>We're here to help! Whether you have a question about our candles, need assistance with an order, or just want to share your thoughts, we'd love to hear from you. Reach out to us through any of the methods below, and we'll get back to you as soon as possible.</p>
            <p className={styles.contactTitle}>Contact Information</p>
            <Box className={styles.contacts}>
                <Link href='mailto:inner.light.wroclaw@gmail.com' target="_blank" className={clsx(styles.media)}>
                    <Image src={'/new/contacts/mail.png'} alt="instagram" width={48} height={48} />
                    <Box>
                        <p className={styles.title}>Email</p>
                        <p className={styles.subtitle}>support@inner-light.pl</p>
                    </Box>
                </Link>

                <Link href='tel:+48 513 320 517' target="_blank" className={clsx(styles.media)}>
                    <Image src={'/new/contacts/phone.png'} alt="instagram" width={48} height={48} />
                    <Box>
                        <p className={styles.title}>Phone</p>
                        <p className={styles.subtitle}>+48 513 320 517</p>
                    </Box>
                </Link>
            </Box>
            <p className={styles.feedbackTitle}>Feedback Form</p>
            <Box component={'form'} className={styles.form}>
                <div className={styles.inputWrapper}>
                    <input
                        required
                        className={clsx(styles.inputName, { [styles.invalid]: nameError })}
                        value={name}
                        onChange={e => {
                            NAME_REGEXP.test(e.target.value) && setNameError(false)
                            setName(e.target.value)
                        }}
                        placeholder="Name"
                    />
                    {nameError && <p className={styles.error}>Requiered</p>}
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        required
                        className={clsx(styles.inputMail, { [styles.invalid]: mailError })}
                        value={mail}
                        onChange={e => {
                            MAIL_REGEXP.test(e.target.value) && setMailError(false)
                            setMail(e.target.value)
                        }}
                        placeholder="Email"
                    />
                    {mailError && <p className={styles.error}>Requiered</p>}
                </div>
                <div className={styles.inputWrapper}>
                    <textarea
                        required
                        className={clsx(styles.inputMsg, { [styles.invalid]: msgError })}
                        value={msg}
                        onChange={e => {
                            e && setMsgError(false)
                            setMsg(e.target.value)
                        }}
                        placeholder="Message"
                    />
                    {msgError && <p className={styles.error}>Requiered</p>}
                </div>
                <Button className={styles.submitBtn} onClick={handleSubmit}>Submit</Button>
            </Box>
            <p className={styles.follow}>Follow Us</p>
            <Box className={styles.social}>
                <Link href='instagram://user?username=inner_light___' className={clsx(styles.followMedia)}>
                    <Image src={'/new/contacts/instagram.png'} alt="instagram" width={48} height={48} />
                    <Box>
                        <p className={styles.followMediaTitle}>Instagram</p>
                    </Box>
                </Link>

                <Link href='http://www.facebook.com/people/Inner-Light/61578233135700/' target="_blank" className={clsx(styles.followMedia)}>
                    <Image src={'/new/contacts/facebook.png'} alt="instagram" width={48} height={48} />
                    <Box>
                        <p className={styles.followMediaTitle}>Facebook</p>
                    </Box>
                </Link>
            </Box>
        </Container>
    )
}