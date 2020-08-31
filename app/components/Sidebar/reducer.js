import produce from 'immer';

import { TOGGLE_SIDEBAR } from './constants';

export const initialState = {
  collapse: false,
};

/* eslint-disable default-case, no-param-reassign */
const sidebarReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_SIDEBAR:
        draft.collapse = !state.collapse;
        break;
    }
  });

export default sidebarReducer;
