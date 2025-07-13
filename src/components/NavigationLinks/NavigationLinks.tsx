'use client'

import { usePathname } from 'next/navigation'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export const NavigationLinks = () => {
    const pathname = usePathname()

    return (
        <Box component='div' className='flex pt-[50px] pl-[30px]'>
            {pathname.split('/').filter(e => !!e).map(path =>
                <Link href={`/${path}`} key={path}>
                    <Typography variant='nav'>
                        /{path}
                    </Typography>
                </Link>
            )}
        </Box>
    )
}