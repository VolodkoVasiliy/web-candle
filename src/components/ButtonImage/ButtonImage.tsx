import Box from "@mui/material/Box"
import { PropsWithChildren } from "react"

export const ButtonImage = ({ src, children }: PropsWithChildren<{ src: string }>) => {
    return (
        <Box
            component='div'
            className={`
                    cursor-pointer
                    h-full 
                    bg-cover
                    hover:bg-size-[110%] 
                    bg-center 
                    transition-all
                    flex
                    items-center
                    justify-center
                    `}
            style={{
                backgroundImage: `url(${src})`
            }}
        >
            {children}
        </Box>
    )
}