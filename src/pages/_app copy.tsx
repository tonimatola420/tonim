import { useState } from 'react';
import Router from 'next/router';

import ThemeProvider from '@/components/Providers';
import { SiteHeader } from '@/components/SiteHeader';
// import 'antd/dist/reset.css';
// Types
import type { AppProps } from 'next/app';
// Styles
import '../../styles/globals.css';



function MyApp({ Component, pageProps, err, }: AppProps & { err: Error } ) {


  return (

    <ThemeProvider locale=''>
      <Component {...pageProps} err={err} />
    </ThemeProvider>


  );
}

export default MyApp;
