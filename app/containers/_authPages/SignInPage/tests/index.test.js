import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import SignInPage from '../Loadable';

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <SignInPage />
      </Provider>
    </IntlProvider>,
  );
}

let store;
let wrapper;

beforeAll(() => {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
});

describe('<SignInPage />', () => {
  it('should render <Form />', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.exists('Form')).toBe(true);
    });
  });
});
