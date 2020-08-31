/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * Setup involving react components is lazy loaded from SetupContent.js
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import loadable from 'utils/loadable';
import 'sanitize.css/sanitize.css';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

// Import i18n messages
import { translationMessages } from './i18n';

const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  const LoadableSetupContent = loadable(() => import('./SetupContent'));

  ReactDOM.render(<LoadableSetupContent messages={messages} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require

  runtime.install({
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating'); // eslint-disable-line no-console
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady'); // eslint-disable-line no-console
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated'); // eslint-disable-line no-console
      // Reload the webpage to load into the new version
      window.location.reload();
    },

    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed'); // eslint-disable-line no-console
    },
  });
}
