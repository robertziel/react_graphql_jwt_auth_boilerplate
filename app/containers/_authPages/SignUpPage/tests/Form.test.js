/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { MockedProvider } from '@apollo/client/testing';
import { SIGN_UP_MUTATION } from '../graphql';

import Form from '../Form';
import messages from '../messages';

const userObject = {
  email: 'test@gmail.com',
  password: 'password',
  passwordConfirmation: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
};

const mocks = (mockResponse) => [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: userObject,
    },
    result: {
      data: {
        authSignUp: mockResponse,
      },
    },
  },
];

const errorMessages = [
  { message: 'FirstName error', path: ['attributes', 'firstName'] },
  { message: 'LastName error', path: ['attributes', 'lastName'] },
  { message: 'Email error', path: ['attributes', 'email'] },
  { message: 'Password error', path: ['attributes', 'password'] },
  {
    message: 'Password confirmation error',
    path: ['attributes', 'passwordConfirmation'],
  },
];

let store;
let wrapper;

function mountWrapper(mockResponse) {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MockedProvider mocks={mocks(mockResponse)} addTypename={false}>
              <div>
                <NotificationSystem />
                <Form />
              </div>
            </MockedProvider>
          </ConnectedRouter>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper(mockResponse) {
  store = new ConfigureTestStore().store;
  await mountWrapper(mockResponse);
}

async function fillInAndSubmitForm() {
  await act(async () => {
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: userObject.email } });
    wrapper
      .find('input[name="first_name"]')
      .simulate('change', { target: { value: userObject.firstName } });
    wrapper
      .find('input[name="last_name"]')
      .simulate('change', { target: { value: userObject.lastName } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: userObject.password } });
    wrapper.find('input[name="password_confirmation"]').simulate('change', {
      target: { value: userObject.passwordConfirmation },
    });
  });
  wrapper.find('button[type="submit"]').simulate('submit');
}

describe('<Form />', () => {
  context('when update succeeded', () => {
    beforeEach(() => {
      configureWrapper({ success: true, errors: [] });
    });

    it('should add success notification', async () => {
      await fillInAndSubmitForm();
      await act(async () => {
        await waitForExpect(() => {
          expect(wrapper.text()).toContain(
            messages.signedUpNotify.defaultMessage,
          );
        });
      });
    });

    it('should redirect to /login', async () => {
      await fillInAndSubmitForm();
      expect(history.location.pathname).toEqual('/login');
    });
  });

  context('when update not succeeded', () => {
    beforeEach(() => {
      configureWrapper({ success: false, errors: errorMessages });
    });

    it('should render an error messages with notification', async () => {
      await fillInAndSubmitForm();
      await act(async () => {
        await waitForExpect(() => {
          wrapper.update();
          errorMessages.forEach((error) => {
            expect(wrapper.contains(error.message)).toEqual(true);
          });
          expect(wrapper.text()).toContain(
            messages.signUpFailedNotify.defaultMessage,
          );
        });
      });
    });
  });
});
