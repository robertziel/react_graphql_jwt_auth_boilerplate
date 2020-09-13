/*
 * SetupContent
 *
 * This component should contain all core setup components
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';

// Import root app
import App from 'containers/App';
import AuthApp from 'containers/AuthApp';

import ApiConnector from 'containers/ApiConnector';
import LanguageProvider from 'containers/LanguageProvider';
import NotificationSystem from 'containers/NotificationsSystem';

import GlobalStyle from 'styles/global-styles';

import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const { persistor, store } = configureStore(initialState, history);

export default function SetupContent(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={props.messages}>
          <ConnectedRouter history={history}>
            <NotificationSystem />
            <ApiConnector store={store} unauthenticatedContent={<AuthApp />}>
              <App />
            </ApiConnector>
            <GlobalStyle />
          </ConnectedRouter>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  );
}

SetupContent.propTypes = {
  messages: PropTypes.object.isRequired,
};
