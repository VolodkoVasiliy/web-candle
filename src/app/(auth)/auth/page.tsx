"use client";

import { useState, useTransition } from "react";
import { signIn } from "@/utils/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Box, Button, Container } from "@mui/material";
import styles from './page.module.scss'
import { BetterFetchError } from "better-auth/react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, startTransition] = useTransition();
    const [error, setError] = useState<BetterFetchError | null>(null)
    const router = useRouter();

    const login = async () => {
        startTransition(async () => {
            await signIn.email(
                { email, password },
                {
                    onSuccess(context) {
                        console.log(context)
                        router.push("/");
                    },
                    onError(context) {
                        setError(context.error)
                    }
                },
            );
        });
    }

    return (
        <Container className={styles.container}>
            <Box className={styles.signinWrapper}>
                <input disabled={loading} value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                <input disabled={loading} value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="password" />
                {error && <p className={styles.error}>{error.message}</p>}
                <Button disabled={loading} className={styles.loginBtn} onClick={login}>
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
                </Button>
            </Box>
        </Container>
    )
}