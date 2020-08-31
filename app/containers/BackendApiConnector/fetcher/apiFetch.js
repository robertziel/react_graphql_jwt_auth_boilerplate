/*
 * BackendApiConnector's fetchers provide functions used to connect to API backend
 * All settings like BACKEND_API_URL, authenticationToken, error response handling etc.
 * are handled under the hood here so that anywhere else in the project can be
 * used one of few simple exported functions requiring component, path, params, and afterSuccess callback.
 *
 */

import queryString from 'query-string';

import { nullifyAuthenticationCredentials } from 'containers/BackendApiConnector/actions';

import { unauthorizedNotify } from '../notifications';

import {
  reportConnectionRefused,
  reportConnectionSucceeded,
} from './connectionRefusedHandler';
import formDataFromJson from './formDataFromJson';
import StoreAccessor from '../StoreAccessor';
import { BACKEND_API_URL } from '../constants';

function getAuthenticationToken() {
  return StoreAccessor.store.getState().backendApiConnector.authenticationToken;
}

function getLanguageLocale() {
  return StoreAccessor.store.getState().language.locale;
}

function signOut() {
  StoreAccessor.store.dispatch(nullifyAuthenticationCredentials());
}

export function fullUrl(path, params) {
  return `${BACKEND_API_URL}${path}${stringifyParams(params)}`;
}

function stringifyParams(params) {
  return params ? `?${queryString.stringify(params)}` : '';
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

  fetch(fullUrl(config.path, config.params), {
    method,
    body: formDataFromJson(config.body),
    headers: {
      Accept: 'application/json',
      'Authentication-Token': getAuthenticationToken(),
      'Language-Locale': getLanguageLocale(),
    },
  })
    .then((result) => {
      switch (result.status) {
        case 401:
          if (config.signIn) {
            break;
          }
          unauthorizedNotify();
          signOut();
          break;
      }
      return result.json();
    })
    .then(
      (result) => {
        reportConnectionSucceeded();
        stopProcessing(component);

        if (typeof config.afterSuccess === 'function') {
          config.afterSuccess(result);
        }
      }, // handle success
      () => {
        if (config.disableRetry) {
          reportConnectionRefused();
          stopProcessing(component);
        } else {
          reportConnectionRefused(component, () =>
            apiFetch(method, component, config),
          );
        }
      }, // handle error
    );
}
