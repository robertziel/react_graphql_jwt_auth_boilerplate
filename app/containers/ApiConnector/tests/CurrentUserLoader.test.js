/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { MockedProvider } from '@apollo/client/testing';
import { PROFILE_QUERY } from '../graphql';

import { setAuthenticationToken } from '../actions';
import CurrentUserLoader from '../CurrentUserLoader';

const authenticationToken = 'a token';
const currentUser = { name: 'User' };

const mockResponse = currentUser;
const mocks = () => [
  {
    request: {
      query: PROFILE_QUERY,
    },
    result: {
      data: {
        profile: mockResponse,
      },
    },
  },
];

let store;
let wrapper;

function mountWrapper() {
  wrapper = mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <MockedProvider mocks={mocks()} addTypename={false}>
          <CurrentUserLoader>
            <div className="application"></div>
          </CurrentUserLoader>
        </MockedProvider>
      </Provider>
    </IntlProvider>,
  );
}

beforeEach(() => {
  store = new ConfigureTestStore().store;
  store.dispatch(setAuthenticationToken(authenticationToken));
});

describe('<CurrentUserLoader />', () => {
  context('when GET /current_user succeeded', () => {
    beforeEach(async () => {
      await mountWrapper();
    });

    it('should save new currentUser in redux store', async () => {
      await act(async () => {
        waitForExpect(() => {
          expect(store.getState().backendApiConnector.currentUser).toEqual(
            currentUser,
          );
        });
      });
    });

    it('should render children', async () => {
      await act(async () => {
        waitForExpect(() => {
          wrapper.update();
          expect(wrapper.exists('.application')).toBe(true);
        });
      });
    });
  });
});
