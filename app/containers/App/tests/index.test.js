/* global context */

import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import App from '../index';

function shallowWrapper() {
  return shallow(<App store={store} />)
    .find('App')
    .shallow();
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = shallowWrapper();
});

describe('<App />', () => {
  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  context('when sidebar collapses', () => {
    beforeEach(() => {
      // It is better to update redux state than use setProps but it does
      // not work according to https://github.com/airbnb/enzyme/issues/2009
      wrapper.setProps({ sidebarCollapsed: true });
    });

    it('should set marginLeft to <ContentWrapper />', () => {
      expect(wrapper.find('ContentWrapper').prop('marginLeft')).toBe(260);
    });

    it('should set marginLeft to <Footer />', () => {
      expect(wrapper.find('Footer').prop('marginLeft')).toBe(260);
    });
  });
});
