import Auth from '@aws-amplify/auth';
import NextStorage from 'amplify-auth-next-storage';

export function configurePool(ctx) {
  Auth.configure({
    region: 'us-west-2',
    userPoolId: process.env.POOL_ID,
    userPoolWebClientId: process.env.CLIENT_ID,
    storage: new NextStorage(ctx, {
      domain: '.localhost:3000',
      expires: 365,
      path: '/',
      secure: true,
    }),
    oauth: {
      domain: process.env.O_AUTH_DOMAIN,
      scope: process.env.O_AUTH_SCOPE,
      redirectSignIn: process.env.O_AUTH_SIGNIN_REDIRECT,
      redirectSignOut: process.env.O_AUTH_SIGNOUT_REDIRECT,
      responseType: 'code'
    }
  });
}