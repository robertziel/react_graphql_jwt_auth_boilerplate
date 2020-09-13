/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { mount } from 'enzyme';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import ApiConnector from '../index';
import { setAuthenticationToken } from '../actions';

// Mock CurrentUserLoader required by ApiConnector
/* eslint-disable react/prop-types */
jest.mock('containers/ApiConnector/CurrentUserLoader', () => (props) => (
  <div>{props.children}</div>
));
/* eslint-enable */

const token = 'a token';

function expectToRenderProperContent(options) {
  expect(wrapper.exists('.authorization-content')).toBe(!options.authorized);
  expect(wrapper.exists('.authorized-content')).toBe(options.authorized);
}

function changeAuthenticationToken(options) {
  act(() => {
    store.dispatch(setAuthenticationToken(options.fromValue));
  });
  wrapper.update();
  act(() => {
    store.dispatch(setAuthenticationToken(options.toValue));
  });
  wrapper.update();
}

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <Provider store={store}>
        <ApiConnector
          store={store}
          unauthenticatedContent={<div className="authorization-content"></div>}
        >
          <div className="authorized-content"></div>
        </ApiConnector>
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

describe('<ApiConnector />', () => {
  context('when authenticationToken changed to null', () => {
    beforeAll(() => {
      changeAuthenticationToken({ fromValue: token, toValue: null });
    });

    it('should render <SignInPage />', () => {
      expectToRenderProperContent({ authorized: false });
    });
  });

  context('when authenticationToken set', () => {
    beforeAll(() => {
      changeAuthenticationToken({ fromValue: null, toValue: token });
    });

    it('should render authorized content', () => {
      expectToRenderProperContent({ authorized: true });
    });
  });
});
