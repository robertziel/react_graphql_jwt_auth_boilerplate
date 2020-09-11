/*
 * BackendApiConnector's fetchers provide functions used to connect to API backend
 * All settings like BACKEND_API_URL, authenticationToken, error response handling etc.
 * are handled under the hood here so that anywhere else in the project can be
 * used one of few simple exported functions requiring component, path, params, and afterSuccess callback.
 *
 */

import { nullifyAuthenticationCredentials } from 'containers/BackendApiConnector/actions';
import client from '../apollo/client';

import { unauthorizedNotify } from '../notifications';

import {
  reportConnectionRefused,
  reportConnectionSucceeded,
} from './connectionRefusedHandler';
import StoreAccessor from '../StoreAccessor';

function signOut() {
  StoreAccessor.store.dispatch(nullifyAuthenticationCredentials());
}

function startProcessing(component) {
  component.setProcessing && component.setProcessing(true); // eslint-disable-line no-unused-expressions
}

function stopProcessing(component) {
  component.setProcessing && component.setProcessing(false); // eslint-disable-line no-unused-expressions
}

/* eslint-disable default-case */
export default function apiFetch(method, component, config) {
  startProcessing(component);

  client[method](config)
    .then((result) => {
      console.log(result);
      switch (result.status) {
        case 401:
          if (config.signIn) {
            break;
          }
          unauthorizedNotify();
          signOut();
          break;
      }
      console.log(result);
      return result.data;
    })
    .then(
      (result) => {
        console.log('Success');
        console.log(result);
        reportConnectionSucceeded();
        stopProcessing(component);

        if (typeof config.afterSuccess === 'function') {
          config.afterSuccess(result);
        }
      }, // handle success
      // (result) => {
      //   console.log('Error');
      //   console.log(result);
      //   if (config.disableRetry) {
      //     reportConnectionRefused();
      //     stopProcessing(component);
      //   } else {
      //     reportConnectionRefused(component, () =>
      //       apiFetch(method, component, config),
      //     );
      //   }
      // }, // handle error
    );
}
