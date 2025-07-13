'use client'


declare module '@mui/material/styles' {
    interface TypographyVariants {
        nav: React.CSSProperties;
        text14: React.CSSProperties;
        text20: React.CSSProperties;
        body2bold: React.CSSProperties;
    }

    // allow configuration using `createTheme()`
    interface TypographyVariantsOptions {
        nav?: React.CSSProperties;
        text14: React.CSSProperties;
        text20: React.CSSProperties;
        body2bold: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        nav: true;
        text14: true;
        text20: true;
        body2bold: true;
    }
}

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: 'var()',
        allVariants: {
            color: "white"
        },
        h1: {
            fontSize: '48px',
            lineHeight: 'auto',
            fontWeight: 'bold'
        },
        h2: {
            fontSize: '32px',
            lineHeight: 'auto',
            fontWeight: 'normal'
        },
        h3: {
            fontSize: '16px',
            lineHeight: 'auto',
            fontWeight: 'normal'
        },
        nav: {
            fontFamily: 'var(--font-monserrat)',
            fontSize: '15px',
            lineHeight: 'auto',
            fontWeight: 'normal'
        },
        body1: {
            fontSize: '18px',
            color: 'black'
        },
        body2: {
            fontSize: '16px',
            color: 'black'
        },
        body2bold: {
            fontFamily: 'var(--font-monserrat)',
            fontWeight: '500',
            fontSize: '16px',
            color: 'black'
        },
        text14: {
            fontFamily: 'var(--font-monserrat)',
            fontSize: '14px',
            color: 'black'
        },
        text20: {
            fontFamily: 'var(--font-monserrat)',
            fontSize: '20px',
            color: 'black'
        }

    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 850,
            lg: 1520,
            xl: 1920,
        }
    },
    components: {
        MuiContainer: {
            defaultProps: {
                disableGutters: true,
                maxWidth: 'xl'
            }
        }
    }
});

export default theme;