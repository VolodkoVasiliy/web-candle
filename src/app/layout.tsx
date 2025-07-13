import "./globals.css";
import { Footer, Header } from "@/components";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import styles from './layout.module.scss'
import clsx from 'clsx'

import { Montserrat_Alternates } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { Container } from "@mui/material";
import StoreProvider from "./StoreProvider";

const monserrat = Montserrat_Alternates({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-monserrat',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={monserrat.variable}>
      <body
        className={clsx(styles.root)}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <StoreProvider>
              <Header />
              <Container maxWidth='lg' component={'main'}>
                {children}
              </Container>
              <Footer />
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
