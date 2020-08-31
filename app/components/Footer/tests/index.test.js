import React from 'react';
import { IntlProvider } from 'react-intl';

import { mount } from 'enzyme';

import Footer from '../index';

// Mock LanguageToggle required by Footer
/* eslint-disable react/prop-types */
jest.mock('components/LanguageToggle/index', () => () => (
  <div>LanguageToggle</div>
));
/* eslint-enable react/prop-types */

describe('<Footer />', () => {
  it('should render and match the snapshot', () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <Footer />
      </IntlProvider>,
    );
    expect(wrapper.html()).toMatchSnapshot();
  });
});
