import { createSelector } from 'reselect';
import { initialState } from './reducer';

const backendApiConnectorState = (state) =>
  state.backendApiConnector || initialState;

export const authenticationTokenSelector = () =>
  createSelector(
    backendApiConnectorState,
    (state) => state.authenticationToken,
  );

export const currentUserSelector = () =>
  createSelector(backendApiConnectorState, (state) => state.currentUser);
