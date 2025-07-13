import { Divider } from "@mui/material"
import styles from './TextWithDivider.module.scss'
import { PropsWithChildren } from "react"

export const TextWithDivider = ({
    children
}: PropsWithChildren) => {
    return (
        <>
            <Divider sx={{ width: '50%' }} />
            <p className={styles.text}>{children}</p>
        </>
    )
}