import React from 'react';
import Auth from '@aws-amplify/auth';
import { configurePool } from '../utils/auth-utils';

const FancyComponent = () => {
  // You can use auth here without configuring the pool since we already
  // configured it at the YourApp level

  Auth.currentUserInfo().then(currentUser => console.log("Current user call from FancyComponent function returns:\n", currentUser));

  return (
  <>
    <div>
      Hello from Fancy Component, which should have access to the user.
    </div>
    <br />
    <button onClick={()=> Auth.federatedSignIn()}>
      Log In
    </button>
  </>
  );
}

FancyComponent.getInitialProps = async (ctx) => {
  // If we need Auth in this component server-side, we need to configure the pool again

  configurePool(ctx);

  await Auth.currentUserInfo().then(currentUser => console.log("Current user call from FancyComponent getInitialProps returns:\n", currentUser));

  return {};
}

export default FancyComponent;