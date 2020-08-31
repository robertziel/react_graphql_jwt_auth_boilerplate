/* global context */

import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import SidebarLink from '../SidebarLink';

const linkSelector = 'a.sidebar-link';

const message = {
  id: 'sample.id',
  defaultMessage: 'Link name',
};

function mountWrapper(path) {
  return mount(
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={[path]}>
        <SidebarLink exact href="/path" text={message} fontAwesomeName="user" />
      </MemoryRouter>
    </IntlProvider>,
  );
}

describe('<SidebarLink />', () => {
  let wrapper;

  context('current path not exact as link', () => {
    beforeEach(() => {
      wrapper = mountWrapper('/');
    });

    it('should not be active', () => {
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(0);
    });

    it('should change to active after click on link', () => {
      wrapper.find('a[href="/path"]').simulate('click', { button: 0 });
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
    });
  });

  context('current path exact as link', () => {
    beforeEach(() => {
      wrapper = mountWrapper('/path');
    });

    it('should be active', () => {
      expect(wrapper.find(`${linkSelector}.active`)).toHaveLength(1);
    });
  });
});
