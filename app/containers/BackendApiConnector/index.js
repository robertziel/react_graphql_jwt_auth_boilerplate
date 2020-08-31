/*
 * BackendApiConnector
 *
 * This component is an intermediary between application and API
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import SignInPage from 'containers/_authPages/SignInPage/Loadable';

import InternetConnectionDetector from 'containers/InternetConnectionDetector';

import CurrentUserLoader from './CurrentUserLoader';
import { authenticationTokenSelector } from './selectors';
import StoreAccessor from './StoreAccessor';

export class BackendApiConnector extends Component {
  constructor(props) {
    super(props);

    StoreAccessor.store = props.store;
  }

  authenticatedContent() {
    return (
      <CurrentUserLoader>
        {React.Children.only(this.props.children)}
      </CurrentUserLoader>
    );
  }

  unauthenticatedContent() {
    return <SignInPage />;
  }

  render() {
    return (
      <InternetConnectionDetector>
        {this.props.authenticationToken
          ? this.authenticatedContent()
          : this.unauthenticatedContent()}
      </InternetConnectionDetector>
    );
  }
}

function mapStateToProps() {
  return createSelector(
    authenticationTokenSelector(),
    (authenticationToken) => ({
      authenticationToken,
    }),
  );
}

BackendApiConnector.propTypes = {
  authenticationToken: PropTypes.string,
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(BackendApiConnector);
