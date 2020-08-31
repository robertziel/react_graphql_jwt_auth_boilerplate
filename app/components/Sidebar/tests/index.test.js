import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import Sidebar from '../index';

const collapseLinksSelector = 'SidebarCollapseLinks';
const buttonSelector = 'button.sidebar-link';
const linkSelector = 'a.sidebar-link';

function button1(wrapper) {
  return wrapper.find(`${collapseLinksSelector} ${buttonSelector}`).first();
}
function link1(wrapper) {
  return wrapper.find(`${collapseLinksSelector} ${linkSelector}`).first();
}

function button2(wrapper) {
  return wrapper.find(`${collapseLinksSelector} ${buttonSelector}`).last();
}
function link2(wrapper) {
  return wrapper.find(`${collapseLinksSelector} ${linkSelector}`).last();
}

function mountWrapper(path) {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <MemoryRouter initialEntries={[path]}>
          <Sidebar />
        </MemoryRouter>
      </Provider>
    </IntlProvider>,
  );
}

let store;

beforeAll(() => {
  store = new ConfigureTestStore().store;
});

describe('<Sidebar />', () => {
  const path = '/';

  it('should change active to <SidebarCollapse /> after click', () => {
    const wrapper = mountWrapper(path);

    button1(wrapper).simulate('click');
    link1(wrapper).simulate('click', { button: 0 });

    expect(button1(wrapper).hasClass('active')).toBeTruthy();
    expect(link1(wrapper).hasClass('active')).toBeTruthy();
    expect(button2(wrapper).hasClass('active')).not.toBeTruthy();
    expect(link2(wrapper).hasClass('active')).not.toBeTruthy();

    button2(wrapper).simulate('click');
    link2(wrapper).simulate('click', { button: 0 });

    expect(button1(wrapper).hasClass('active')).not.toBeTruthy();
    expect(link1(wrapper).hasClass('active')).not.toBeTruthy();
    expect(button2(wrapper).hasClass('active')).toBeTruthy();
    expect(link2(wrapper).hasClass('active')).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    const wrapper = mountWrapper(path);

    const hamburgerSelector = 'div.hamburger';
    const collapseSelector = 'div.sidebar-collapse';

    wrapper.find(hamburgerSelector).simulate('click');

    setTimeout(() => {
      expect(wrapper.find(hamburgerSelector).hasClass('open')).toBeTruthy();
      expect(wrapper.find(collapseSelector).hasClass('show')).toBeTruthy();
    }, 100);

    wrapper.find(hamburgerSelector).simulate('click');

    expect(wrapper.find(hamburgerSelector).hasClass('open')).not.toBeTruthy();
    expect(wrapper.find(collapseSelector).hasClass('show')).not.toBeTruthy();
  });
});
