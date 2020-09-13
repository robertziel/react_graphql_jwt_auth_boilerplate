/*
 * ApiConnector
 *
 * This component is an intermediary between application and API
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ApolloProvider } from '@apollo/client';

import InternetConnectionDetector from 'containers/InternetConnectionDetector';

import CurrentUserLoader from './CurrentUserLoader';
import { authenticationTokenSelector } from './selectors';
import StoreAccessor from './StoreAccessor';
import apolloClient from './apollo/client';

export class ApiConnector extends Component {
  constructor(props) {
    super(props);
    this.props = props;

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
    return this.props.unauthenticatedContent;
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <InternetConnectionDetector>
          {this.props.authenticationToken
            ? this.authenticatedContent()
            : this.unauthenticatedContent()}
        </InternetConnectionDetector>
      </ApolloProvider>
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

ApiConnector.propTypes = {
  authenticationToken: PropTypes.string,
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
  unauthenticatedContent: PropTypes.node.isRequired,
};

export default connect(mapStateToProps)(ApiConnector);
