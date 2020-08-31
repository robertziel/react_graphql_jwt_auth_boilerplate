import produce from 'immer';

import {
  NULLIFY_AUTHENTICATION_CREDENTIALS,
  SET_AUTHENTICATION_TOKEN,
  SET_CURRENT_USER,
} from './constants';

export const initialState = {
  authenticationToken: null,
  currentUser: null,
};

/* eslint-disable default-case, no-param-reassign */
const backendApiConnectorReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NULLIFY_AUTHENTICATION_CREDENTIALS:
        draft.authenticationToken = null;
        draft.currentUser = null;
        break;
      case SET_AUTHENTICATION_TOKEN:
        draft.authenticationToken = action.token;
        break;
      case SET_CURRENT_USER:
        draft.currentUser = action.currentUser;
        break;
    }
  });

export default backendApiConnectorReducer;
