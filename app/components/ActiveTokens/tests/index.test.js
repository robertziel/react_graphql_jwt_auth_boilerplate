/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import ActiveTokens from '../index';

const indexPath = '/auth/active_tokens';
const ip = '::1';
const browser = 'Chrome';
const activeTokens = [
  {
    id: 1,
    ip,
    browser,
  },
];
const responseBody = { count: 100, authentication_tokens: activeTokens };

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <ActiveTokens />
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

describe('<ActiveTokens />', () => {
  context('when GET /activeTokens succeeded', () => {
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

    it('should list activeTokens', async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.text()).toContain(ip);
        expect(wrapper.text()).toContain(browser);
      });
    });
  });
});
