/**
 *
 * AuthApp.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Footer from 'components/Footer/index';
import SignInPage from 'containers/_authPages/SignInPage/Loadable';
import SignUpPage from 'containers/_authPages/SignUpPage/Loadable';
import ContentWrapper from './ContentWrapper';

function AuthApp() {
  return (
    <ContentWrapper>
      <Switch>
        <Route exact path="/login" component={SignInPage} />
        <Route exact path="/sign-up" component={SignUpPage} />
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
      <Footer />
    </ContentWrapper>
  );
}

export default AuthApp;
