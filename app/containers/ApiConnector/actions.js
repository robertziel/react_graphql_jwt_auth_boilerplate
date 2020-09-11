import {
  NULLIFY_AUTHENTICATION_CREDENTIALS,
  SET_AUTHENTICATION_TOKEN,
  SET_CURRENT_USER,
} from './constants';

export function nullifyAuthenticationCredentials() {
  return {
    type: NULLIFY_AUTHENTICATION_CREDENTIALS,
  };
}

export function setAuthenticationToken(token) {
  return {
    type: SET_AUTHENTICATION_TOKEN,
    token,
  };
}

export function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser,
  };
}
