'use client'

import { pathList } from "@/consts/pathList"
import { Box, Typography } from "@mui/material"
import { usePathname } from "next/dist/client/components/navigation"

export const Subtitle = () => {
    const path = usePathname()
    if (!pathList[path]?.subtitle) {
        return null;
    }
    return (
        <Box component='div' className="flex pt-[30px]align-center justify-center">
            <Typography variant="h3" color="black">{pathList[path]?.subtitle}</Typography>
        </Box>
    )
}