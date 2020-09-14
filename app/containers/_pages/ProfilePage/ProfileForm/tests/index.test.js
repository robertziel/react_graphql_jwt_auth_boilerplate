/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { MockedProvider } from '@apollo/client/testing';
import prepareActiveModelErrors from 'utils/prepareActiveModelErrors';

import ProfilePage from '../index';
import messages from '../messages';
import { PROFILE_QUERY, PROFILE_UPDATE_MUTATION } from '../graphql';

const userObject = {
  email: 'test@gmail.com',
  firstName: 'first name',
  lastName: 'last name',
};
const userObjectUpdated = {
  email: 'test2@gmail.com',
  firstName: 'new first name',
  lastName: 'new last name',
  password: 'new pass',
  passwordConfirmation: 'new pass',
};

const mocks = (mockResponseUpdate) => [
  {
    request: {
      query: PROFILE_QUERY,
    },
    result: {
      data: {
        profile: userObject,
      },
    },
  },
  {
    request: {
      query: PROFILE_UPDATE_MUTATION,
      variables: userObjectUpdated,
    },
    result: {
      data: {
        profileUpdate: mockResponseUpdate,
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

function mountWrapper(mockResponseUpdate) {
  wrapper = mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <MockedProvider mocks={mocks(mockResponseUpdate)} addTypename={false}>
            <div>
              <NotificationSystem />
              <ProfilePage user={userObjectUpdated} />
            </div>
          </MockedProvider>
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper(mockResponseUpdate) {
  store = new ConfigureTestStore().store;
  await mountWrapper(mockResponseUpdate);
}

async function waitTillStartDataFetched() {
  await act(async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(`input[name="email"]`).props().defaultValue).toEqual(
        userObject.email,
      );
      expect(
        wrapper.find(`input[name="first_name"]`).props().defaultValue,
      ).toEqual(userObject.firstName);
      expect(
        wrapper.find(`input[name="last_name"]`).props().defaultValue,
      ).toEqual(userObject.lastName);
      expect(
        wrapper.find(`input[name="password"]`).props().defaultValue,
      ).toEqual(undefined);
      expect(
        wrapper.find(`input[name="password_confirmation"]`).props()
          .defaultValue,
      ).toEqual(undefined);
    });
  });
}

async function fillInAndSubmitForm() {
  await waitTillStartDataFetched();
  await act(async () => {
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: userObjectUpdated.email } });
    wrapper
      .find('input[name="first_name"]')
      .simulate('change', { target: { value: userObjectUpdated.firstName } });
    wrapper
      .find('input[name="last_name"]')
      .simulate('change', { target: { value: userObjectUpdated.lastName } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: userObjectUpdated.password } });
    wrapper.find('input[name="password_confirmation"]').simulate('change', {
      target: { value: userObjectUpdated.passwordConfirmation },
    });
  });
  await act(async () => {
    wrapper.find('button[type="submit"]').simulate('submit');
  });
}

describe('<Form />', () => {
  context('when update succeeded', () => {
    beforeEach(() => {
      configureWrapper({ success: true, errors: [] });
    });

    it('should add success notification', async () => {
      await fillInAndSubmitForm();
      await waitForExpect(() => {
        expect(wrapper.text()).toContain(
          messages.profileUpdateSucceededNotify.defaultMessage,
        );
      });
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

          const errors = prepareActiveModelErrors(errorMessages);
          Object.keys(errors).forEach((key) => {
            const errorMessage =
              key === 'attributes_password'
                ? `${errors[key]}. ${messages.formPasswordLeaveBlank.defaultMessage}`
                : errors[key];
            expect(wrapper.contains(errorMessage)).toEqual(true);
          });

          expect(wrapper.text()).toContain(
            messages.profileUpdateFailedNotify.defaultMessage,
          );
        });
      });
    });
  });
});
