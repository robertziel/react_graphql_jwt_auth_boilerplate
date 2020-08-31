import React from 'react';
import { IntlProvider } from 'react-intl';

import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import NotFoundPage from '../Loadable';

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <NotFoundPage />
    </IntlProvider>,
  );
}

let wrapper;

beforeAll(() => {
  wrapper = mountWrapper();
});

describe('<NotFoundPage />', () => {
  it('should render and match the snapshot', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
