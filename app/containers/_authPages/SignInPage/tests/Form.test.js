/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { MockedProvider } from '@apollo/client/testing';

import backendApiConnectorMessages from 'containers/ApiConnector/messages';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import Form from '../Form';
import messages from '../messages';
import { AUTH_LOGIN_MUTATION } from '../graphql';

const authenticationToken = 'a token';
const errorMessage = 'Error message';
const email = 'test@gmail.com';
const password = '12345678';

let store;
let wrapper;
let mockResponse = null;
const mocks = () => [
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

function mountWrapper() {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <MockedProvider mocks={mocks()} addTypename={false}>
            <div>
              <NotificationSystem />
              <Form />
            </div>
          </MockedProvider>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await mountWrapper();
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
      await act(async () => {
        waitForExpect(() => {
          expect(
            store.getState().backendApiConnector.authenticationToken,
          ).toEqual(authenticationToken);
        });
      });
    });

    it('should add signed in notification', async () => {
      await act(async () => {
        waitForExpect(() => {
          expect(wrapper.text()).toContain(
            messages.signedInNotify.defaultMessage,
          );
        });
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
      await act(async () => {
        waitForExpect(() => {
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
});
