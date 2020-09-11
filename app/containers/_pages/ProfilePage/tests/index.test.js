import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import ProfileForm from '../ProfileForm';
import ProfilePage from '../Loadable';

/* eslint-disable react/prop-types */
// Mock ProfileForm required by Profile
jest.mock('containers/_pages/ProfilePage/ProfileForm/index', () => () => (
  <div>ProfileForm</div>
));
/* eslint-enable react/prop-types */

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <ProfilePage />
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

describe('<ProfilePage />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  it('should render ProfileForm', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(ProfileForm).length).toEqual(1);
    });
  });
});
