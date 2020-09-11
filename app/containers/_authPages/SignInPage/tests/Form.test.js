/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import backendApiConnectorMessages from 'containers/BackendApiConnector/messages';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import Form from '../Form';
import messages from '../messages';
import { AUTH_LOGIN_MUTATION } from '../graphql';

const authenticationToken = 'a token';
const errorMessage = 'Error message';
const email = 'test@gmail.com';
const password = '12345678';
const submitPath = '/auth/sign_in';

let store;
let wrapper;
let mockResponse = null;
const mocks = () => {
  return [
    {
      request: {
        query: AUTH_LOGIN_MUTATION,
        variables: { email, password },
      },
      result: {
        data: {
          authLogin: mockResponse,
        },
      },
    },
  ];
}

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <NotificationSystem />
          <Form />
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await act(async () => {
    wrapper = mountWrapper();
  });
  return wrapper;
}

function fillInAndSubmitForm() {
  wrapper
    .find('input[name="email"]')
    .simulate('change', { target: { value: email } });
  wrapper
    .find('input[name="password"]')
    .simulate('change', { target: { value: password } });

  wrapper.find('button[type="submit"]').simulate('submit');
}

describe('<Form />', () => {
  context('when sign in succeeded', () => {
    beforeEach(() => {
      mockResponse = { token: authenticationToken };
      configureWrapper();
      fillInAndSubmitForm();
    });

    it('should save new authenticationToken in redux store', async () => {
      await waitForExpect(() => {
        expect(
          store.getState().backendApiConnector.authenticationToken,
        ).toEqual(authenticationToken);
      });
    });

    it('should add signed in notification', async () => {
      await waitForExpect(() => {
        expect(wrapper.text()).toContain(
          messages.signedInNotify.defaultMessage,
        );
      });
    });
  });

  context('when sign in not succeeded', () => {
    beforeEach(() => {
      mockResponse = { token: null };
      configureWrapper();
      fillInAndSubmitForm();
    });

    it('should render an error message without unauthorized notification', async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.contains(errorMessage)).toEqual(true);
        expect(
          wrapper.contains(
            backendApiConnectorMessages.unauthorizedNotify.defaultMessage,
          ),
        ).toEqual(false);
      });
    });
  });
});
