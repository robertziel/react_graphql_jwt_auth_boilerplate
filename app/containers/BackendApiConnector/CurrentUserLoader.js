import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import { colors } from 'styles/constants';
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners';

import FetchedContent from 'containers/FetchedContent';
import { setCurrentUser } from './actions';
import { useQuery } from './apollo/fetchers';

import { currentUserSelector } from './selectors';
import { PROFILE_QUERY } from './graphql';

function CurrentUserLoader({ children, currentUser, onLoadSuccess }) {
  useQuery(PROFILE_QUERY, {
    onCompleted: (data) => {
      onLoadSuccess(data.profile);
    },
  });

  return (
    <FetchedContent
      processing={!currentUser}
      spinner={
        <FulfillingBouncingCircleSpinner color={colors.main} size={80} />
      }
    >
      {React.Children.only(children)}
    </FetchedContent>
  );
}

function mapStateToProps() {
  return createSelector(currentUserSelector(), (currentUser) => ({
    currentUser,
  }));
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadSuccess: (currentUser) => dispatch(setCurrentUser(currentUser)),
    dispatch,
  };
}

CurrentUserLoader.propTypes = {
  children: PropTypes.node.isRequired,
  currentUser: PropTypes.object,
  onLoadSuccess: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserLoader);
