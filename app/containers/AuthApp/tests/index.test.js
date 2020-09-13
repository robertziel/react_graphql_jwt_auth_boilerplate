import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import AuthApp from '../index';

function shallowWrapper() {
  return shallow(<AuthApp store={store} />);
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = shallowWrapper();
});

describe('<AuthApp />', () => {
  it('should match snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
