/* global context */

import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import SidebarCollapseLinks from '../SidebarCollapseLinks';

const buttonSelector = 'button.sidebar-link';
const linkSelector = 'a.sidebar-link';

const message = {
  id: 'sample.id',
  defaultMessage: 'Link name',
};

function mountWrapper(path) {
  return mount(
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={[path]}>
        <SidebarCollapseLinks
          text={message}
          fontAwesomeName="home"
          links={[
            { exact: true, href: '/route-1', text: message },
            { exact: true, href: '/route-2', text: message },
          ]}
        />
      </MemoryRouter>
    </IntlProvider>,
  );
}

describe('<SidebarCollapseLinks />', () => {
  let wrapper;

  context('current path not included in any link', () => {
    beforeEach(() => {
      wrapper = mountWrapper('/');
    });

    it('should not be active', () => {
      expect(wrapper.find(`${buttonSelector}.active`)).toHaveLength(0);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(0);
    });

    it('should change to active after click on link', () => {
      wrapper.find(buttonSelector).simulate('click');
      wrapper.find('a[href="/route-1"]').simulate('click', { button: 0 });
      expect(wrapper.find(`${buttonSelector}.active`)).toHaveLength(1);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
    });

    it('should not be collapsed', () => {
      expect(wrapper.find(`div.collapse.show`)).toHaveLength(0);
    });

    it('should change to collapsed after click on button', () => {
      wrapper.find(buttonSelector).simulate('click');
      expect(wrapper.find(`div.collapse.show`)).toHaveLength(1);
    });
  });

  context('current path exact to any link', () => {
    beforeEach(() => {
      wrapper = mountWrapper('/route-1');
    });

    it('should be active', () => {
      expect(wrapper.find(`${buttonSelector}.active`)).toHaveLength(1);
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
    });

    it('should be collapsed', () => {
      expect(wrapper.find(`div.collapse.show`)).toHaveLength(1);
    });
  });
});
