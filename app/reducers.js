/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';

import backendApiConnectorReducer from 'containers/ApiConnector/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import sidebarReducer from 'components/Sidebar/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    backendApiConnector: backendApiConnectorReducer,
    language: languageProviderReducer,
    sidebar: sidebarReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
