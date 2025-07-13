'use client'

import { pathList } from "@/consts/pathList"
import { Box, Typography } from "@mui/material"
import { usePathname } from "next/navigation"

export const Title = () => {
    const path = usePathname()
    if (!pathList[path]?.title) {
        return null;
    }

    return (
        <Box component='div' className="flex pt-[36px] align-center justify-center">
            <Typography variant="h1" color="black" >{pathList[path]?.title}</Typography>
        </Box>
    )
}