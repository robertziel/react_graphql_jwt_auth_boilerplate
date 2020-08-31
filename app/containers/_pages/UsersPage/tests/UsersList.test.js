/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import UsersList from '../Loadable';

const indexPath = '/users';
const email = 'test@gmail.com';
const username = 'username';
const users = [
  {
    id: 1,
    email,
    username,
  },
];
const responseBody = { count: 100, users };

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <UsersList />
      </Provider>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await act(async () => {
    wrapper = mountWrapper();
  });
}

describe('<UsersList />', () => {
  context('when GET /users succeeded', () => {
    loadApiFetchMock({
      method: 'GET',
      path: indexPath,
      params: {
        page: 1,
        per_page: 10,
      },
      responseBody,
      status: 200,
    });

    beforeEach(() => {
      configureWrapper();
    });

    it('should list users', async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.text()).toContain(email);
        expect(wrapper.text()).toContain(username);
      });
    });
  });
});
