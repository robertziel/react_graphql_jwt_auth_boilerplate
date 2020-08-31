import { createSelector } from 'reselect';
import { initialState } from './reducer';

const sidebarState = (state) => state.sidebar || initialState;

const sidebarToggleSelector = () =>
  createSelector(sidebarState, (state) => state.collapse);

export { sidebarToggleSelector };
