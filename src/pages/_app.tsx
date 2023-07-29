import { useState } from 'react';
import Router from 'next/router';

import ThemeProvider from '@/components/Providers';
import { SiteHeader } from '@/components/SiteHeader';
// import 'antd/dist/reset.css';
// Types
import type { AppProps } from 'next/app';
// Styles
import '../../styles/globals.css';
import { AppGlobalProvider } from "@/stores/AppGlobalProvider";
// import { EmployeeProvider } from "@/stores/contexts/EmployeeContext";
import { CartProvider } from '@/stores/contexts/CartProvider';

import { wrapper } from "@/stores/reducers/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";


function MyApp({ Component, ...rest }: AppProps & { err: Error }) {
  // const store: any = useStore();
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, err } = props;

  return (
    <AppGlobalProvider>
      <ThemeProvider locale=''>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Component {...pageProps} err={err} />
        </PersistGate>
      </ThemeProvider>
    </AppGlobalProvider>


  );
}

// function MyApp({ Component, pageProps, err, }: AppProps & { err: Error }) {
//   const store: any = useStore();

//   return (
//     <AppGlobalProvider>
//       <ThemeProvider locale=''>
//       <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
//         <Component {...pageProps} err={err} />
//         </PersistGate>
//       </ThemeProvider>
//     </AppGlobalProvider>


//   );
// }

export default wrapper.withRedux(MyApp);
// export default MyApp;
