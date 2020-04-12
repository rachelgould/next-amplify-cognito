import React from 'react';
import Auth from '@aws-amplify/auth';
import { configurePool } from '../utils/auth-utils';
import fetch from 'node-fetch';

global.fetch = fetch; // One workaround for getting Auth.configure to work properly server-side

const YourApp = ({ Component, pageProps }) => {
  // Running this once at the app level, client-side, allows you to
  // use `Auth` methods in all of your components 

  configurePool();

  return <Component {...pageProps} />;
};

YourApp.getInitialProps = async (appContext) => {
  // const appProps = await YourApp.getInitialProps(appContext);

  // However, we need to configure the pool every time it's needed within getInitialProps

  const appProps = configurePool(appContext.ctx);

  await Auth.currentUserInfo().then(currentUser => console.log("Current user call from _app returns:\n", currentUser));

  // ... do stuff with Auth. e.g. Auth.currentUserInfo

  return { ...appProps };
};

export default YourApp;
