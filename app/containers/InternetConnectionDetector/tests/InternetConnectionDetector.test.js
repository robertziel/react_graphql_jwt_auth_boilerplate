/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';

import { mount } from 'enzyme';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';

import { notificationMessageSelector } from 'testsHelpers/notifications';

import InternetConnectionDetector, { isOnline } from '../index';
import messages from '../messages';

const internetConnectionBackNotifySelector = notificationMessageSelector(
  messages.internetConnectionBackNotify.defaultMessage,
);
const noInternetConnectionNotifySelector = notificationMessageSelector(
  messages.noInternetConnectionNotify.defaultMessage,
);

const eventListeners = {};
window.addEventListener = jest.fn((event, cb) => {
  eventListeners[event] = cb;
});

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <NotificationSystem />
        <InternetConnectionDetector>
          <div className="content"></div>
        </InternetConnectionDetector>
      </IntlCatcher>
    </IntlProvider>,
  );
}

let onLineGetter;
let wrapper;

beforeAll(() => {
  onLineGetter = jest.spyOn(window.navigator, 'onLine', 'get');
});

describe('<InternetConnectionDetector />', () => {
  context('when connected to internet before mount', () => {
    beforeEach(() => {
      onLineGetter.mockReturnValue(true);
      wrapper = mountWrapper();
    });

    it('should render content', () => {
      expect(wrapper.exists('.content')).toBe(true);
    });

    it('isOnline() should return true', () => {
      expect(isOnline()).toBe(true);
    });

    it('should render not render internetConnectionBackNotify', () => {
      expect(wrapper.exists(internetConnectionBackNotifySelector)).toBe(false);
    });

    context('and internet disconnected', () => {
      beforeEach(() => {
        onLineGetter.mockReturnValue(false);
        eventListeners.offline();
      });

      it('isOnline() should return true', () => {
        expect(isOnline()).toBe(false);
      });

      it('should render noInternetConnectionNotify', () => {
        wrapper.update();
        expect(wrapper.exists(noInternetConnectionNotifySelector)).toBe(true);
      });
    });
  });

  context('when not connected to internet before mount', () => {
    beforeEach(() => {
      onLineGetter.mockReturnValue(false);
      wrapper = mountWrapper();
    });

    it('should render content', () => {
      expect(wrapper.exists('.content')).toBe(true);
    });

    it('should render noInternetConnectionNotify', () => {
      expect(wrapper.exists(noInternetConnectionNotifySelector)).toBe(true);
    });

    context('and connected back to internet', () => {
      beforeEach(() => {
        onLineGetter.mockReturnValue(true);
        eventListeners.online();
      });

      it('isOnline() should return true', () => {
        expect(isOnline()).toBe(true);
      });

      it('should render internetConnectionBackNotify', () => {
        wrapper.update();
        expect(wrapper.exists(internetConnectionBackNotifySelector)).toBe(true);
      });

      it('should remove noInternetConnectionNotify', () => {
        wrapper.update();
        expect(wrapper.exists(noInternetConnectionNotifySelector)).toBe(false);
      });
    });
  });
});
