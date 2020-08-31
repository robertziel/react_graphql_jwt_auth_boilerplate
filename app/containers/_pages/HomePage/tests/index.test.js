import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import ActiveTokens from 'components/ActiveTokens';
import HomePage from '../Loadable';

// Mock ActiveTokens required by HomePage
jest.mock('components/ActiveTokens/index.js', () => () => (
  <div>ActiveTokens</div>
));
/* eslint-enable react/prop-types */

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <HomePage />
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
}

describe('<HomePage />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('should render ActiveTokens', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(ActiveTokens).length).toEqual(1);
    });
  });
});
