import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Spectral, Montserrat, Sorts_Mill_Goudy, Sacramento } from "next/font/google";
import "../globals.css";
import Providers from "./providers";
import Link from 'next/link';
import Appbar_Landing from './__components/Appbar/appbar-landing'

//RTK, Redux
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserQuery } from './store/features/api/apiSlice';
import { setCredentials } from './store/features/auth/authSlice'; 

export const metadata: Metadata = {
  title: "2ofus.me",
  description: "No cost paper wedding invitations, printed and mailed",
}; 

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const goudy = Sorts_Mill_Goudy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-goudy',
});

const sacramento = Sacramento({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sacramento',
});


export default function RootLayout({children} 
  : {children: React.ReactNode} ) {
    
  return (

    <html lang="en" className={`${spectral.variable} ${montserrat.variable} ${goudy.variable} ${sacramento.variable}`}>
      <body style={{ margin: 0, padding:0 }} >
        <AppRouterCacheProvider>
        <Providers>
        {children}

        </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

/* In Next.js, only the root layout (the one at layout.tsx) should have <html> and <body> tags.
When you have nested <html> and <body> tags, it creates invalid HTML structure and 
causes hydration mismatches, especially with MUI/Emotion which injects styles into the document head.*/


