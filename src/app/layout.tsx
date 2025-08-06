import "./globals.css";
import { Header } from "@/components";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import styles from './layout.module.scss'
import clsx from 'clsx'

import { Epilogue } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import { Container } from "@mui/material";
import StoreProvider from "./StoreProvider";

const epiloque = Epilogue({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-epiloque',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={epiloque.variable}>
      <body
        className={clsx(styles.root)}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <StoreProvider>
              <Header />
              <Container maxWidth='sm' component={'main'}>
                {children}
              </Container>
              {/* <Footer /> */}
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>

      </body>
    </html>
  );
}
