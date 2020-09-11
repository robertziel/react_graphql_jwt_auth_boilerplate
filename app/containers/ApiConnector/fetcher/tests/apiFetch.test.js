/* global context */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import waitForExpect from 'wait-for-expect';

import NotificationSystem from 'containers/NotificationsSystem';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { notificationMessageSelector } from 'testsHelpers/notifications';

import { setAuthenticationToken } from '../../actions';
import * as connectionRefusedHandler from '../connectionRefusedHandler';
import apiFetch from '../apiFetch';
import messages from '../../messages';

jest.spyOn(connectionRefusedHandler, 'reportConnectionRefused');
jest.spyOn(connectionRefusedHandler, 'reportConnectionSucceeded');

const unauthorizedNotifySelector = notificationMessageSelector(
  messages.unauthorizedNotify.defaultMessage,
);
const connectionRefusedAutodismissableNotifySelector = notificationMessageSelector(
  messages.connectionRefusedAutodismissableNotify.defaultMessage,
);

const locale = 'en';
const path = '/';
const token = 'a token';

function mountWrapper() {
  return mount(
    <IntlProvider locale={locale}>
      <IntlCatcher>
        <Provider store={store}>
          <NotificationSystem />
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

const mockedComponent = {
  isMounted: () => true,
};

function subject(options = {}) {
  apiFetch('GET', mockedComponent, Object.assign({ path }, options));
}

let store;
let wrapper;

beforeEach(() => {
  store = new ConfigureTestStore().store;
  wrapper = mountWrapper();
});

describe('apiFetch()', () => {
  it('Language-Locale header must be included', () => {
    fetchMock.mock((url, opts) => opts.headers['Language-Locale'] === locale, {
      status: 200,
    });
    subject();
    fetchMock.restore();
  });

  it('Authentication-Token header must be included', () => {
    act(() => {
      store.dispatch(setAuthenticationToken(token));
    });
    fetchMock.mock(
      (url, opts) => opts.headers['Authentication-Token'] === token,
      {
        status: 200,
      },
    );
    subject();
    fetchMock.restore();
  });

  context('when fetch succeeded', () => {
    loadApiFetchMock({
      method: 'GET',
      path,
      responseBody: {},
      status: 200,
    });

    it('should call reportConnectionSucceeded not reportConnectionRefused', async () => {
      jest.clearAllMocks();
      subject();
      await waitForExpect(() => {
        expect(
          connectionRefusedHandler.reportConnectionSucceeded,
        ).toHaveBeenCalled();
        expect(
          connectionRefusedHandler.reportConnectionRefused,
        ).not.toHaveBeenCalled();
      });
    });
  });

  context('when fetch not succeeded', () => {
    loadApiFetchMock({
      method: 'GET',
      path,
      throws: { message: 'ERR_SERVER_CONNECTION' },
    });

    beforeEach(() => {
      connectionRefusedHandler.reportConnectionSucceeded();
    });

    context('disableRetry is false', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        subject({ disableRetry: false });
      });

      it('should notify that cannot connect to the server', async () => {
        await waitForExpect(() => {
          wrapper.update();
          expect(
            wrapper.exists(connectionRefusedAutodismissableNotifySelector),
          ).toBe(true);
        });
      });

      it('should call reportConnectionRefused not reportConnectionSucceeded', async () => {
        await waitForExpect(() => {
          expect(
            connectionRefusedHandler.reportConnectionRefused,
          ).toHaveBeenCalledWith(mockedComponent, expect.any(Function));
          expect(
            connectionRefusedHandler.reportConnectionSucceeded,
          ).not.toHaveBeenCalled();
        });
      });
    });

    context('disableRetry is true', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        subject({ disableRetry: true });
      });

      it('should notify that cannot connect to the server', async () => {
        await waitForExpect(() => {
          wrapper.update();
          expect(
            wrapper.exists(connectionRefusedAutodismissableNotifySelector),
          ).toBe(true);
        });
      });

      it('should call reportConnectionRefused not reportConnectionSucceeded', async () => {
        await waitForExpect(() => {
          expect(
            connectionRefusedHandler.reportConnectionRefused,
          ).toHaveBeenCalledWith();
          expect(
            connectionRefusedHandler.reportConnectionSucceeded,
          ).not.toHaveBeenCalled();
        });
      });
    });
  });

  context('when fetch unauthorized', () => {
    loadApiFetchMock({
      status: 401,
    });

    beforeEach(() => {
      subject();
    });

    it('should nullify backendApiConnector credentials', async () => {
      await waitForExpect(() => {
        expect(
          store.getState().backendApiConnector.authenticationToken,
        ).toEqual(null);
        expect(store.getState().backendApiConnector.currentUser).toEqual(null);
      });
    });

    it('should notify', async () => {
      await waitForExpect(() => {
        wrapper.update();
        expect(wrapper.exists(unauthorizedNotifySelector)).toBe(true);
      });
    });
  });
});
