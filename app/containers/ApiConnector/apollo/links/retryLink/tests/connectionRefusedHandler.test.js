/* global context */

import React from 'react';
import { IntlProvider } from 'react-intl';

import { mount } from 'enzyme';

import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';

import { notificationMessageSelector } from 'testsHelpers/notifications';

import {
  reportConnectionRefused,
  reportConnectionSucceeded,
} from '../connectionRefusedHandler';

import messages from '../../../../messages';

const connectionRefusedNotifySelector = notificationMessageSelector(
  messages.connectionRefusedNotify.defaultMessage,
);

const connectionRefusedAutodismissableNotifySelector = notificationMessageSelector(
  messages.connectionRefusedAutodismissableNotify.defaultMessage,
);

const mockFunction = jest.fn(() => {});

class MockedComponent {
  constructor() {
    this.isMounted = true;
  }

  mount() {
    this.isMounted = true;
  }

  unmount() {
    this.isMounted = false;
  }
}

const component = new MockedComponent();

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <NotificationSystem />
      </IntlCatcher>
    </IntlProvider>,
  );
}

let wrapper;

beforeAll(() => {
  wrapper = mountWrapper();
});

afterEach(() => {
  reportConnectionSucceeded();
});

describe('<connectionRefusedHandler />', () => {
  context('reportConnectionRefused()', () => {
    context('notification without queued fetches exists', () => {
      beforeEach(() => {
        reportConnectionRefused();
      });

      it('should not add new notification', () => {
        reportConnectionRefused();
        wrapper.update();
        expect(wrapper.find(connectionRefusedNotifySelector).length).toBe(1);
        expect(
          wrapper.find(connectionRefusedAutodismissableNotifySelector).length,
        ).toBe(0);
      });

      it('should update notification if fetch added to queue', () => {
        reportConnectionRefused(component, mockFunction);
        wrapper.update();
        expect(wrapper.find(connectionRefusedNotifySelector).length).toBe(0);
        expect(
          wrapper.find(connectionRefusedAutodismissableNotifySelector).length,
        ).toBe(1);
      });
    });

    context('notification with queued fetches exists', () => {
      beforeEach(() => {
        reportConnectionRefused(component, mockFunction);
      });

      it('should not add new notification', () => {
        reportConnectionRefused(component, mockFunction);
        wrapper.update();
        expect(wrapper.find(connectionRefusedNotifySelector).length).toBe(0);
        expect(
          wrapper.find(connectionRefusedAutodismissableNotifySelector).length,
        ).toBe(1);
      });
    });
  });

  context('reportConnectionSucceeded()', () => {
    context('notification without queued fetches exists', () => {
      beforeEach(() => {
        reportConnectionRefused();
      });

      it('should remove error notification', () => {
        reportConnectionSucceeded();
        wrapper.update();
        expect(wrapper.exists(connectionRefusedNotifySelector)).toBe(false);
        expect(
          wrapper.exists(connectionRefusedAutodismissableNotifySelector),
        ).toBe(false);
      });

      it('should make possible to rerender notification on next connection refused', () => {
        reportConnectionSucceeded();
        reportConnectionRefused();
        wrapper.update();
        expect(wrapper.exists(connectionRefusedNotifySelector)).toBe(true);
        expect(
          wrapper.exists(connectionRefusedAutodismissableNotifySelector),
        ).toBe(false);
      });

      context('when queued fetches added', () => {
        beforeEach(() => {
          jest.clearAllMocks();
          reportConnectionRefused(component, mockFunction);
          reportConnectionRefused(component, mockFunction);
        });

        context('when container is mounted', () => {
          beforeEach(() => {
            component.mount();
          });

          it('should shift and call all queued fetches', () => {
            reportConnectionSucceeded();
            expect(mockFunction).toHaveBeenCalledTimes(2);

            reportConnectionRefused();
            reportConnectionSucceeded();
            expect(mockFunction).toHaveBeenCalledTimes(2);
          });
        });

        context('when container is unmounted', () => {
          beforeEach(() => {
            component.unmount();
          });

          it('should shift all queued fetches without calling them', () => {
            reportConnectionSucceeded();
            expect(mockFunction).toHaveBeenCalledTimes(0);

            component.mount();
            reportConnectionRefused();
            reportConnectionSucceeded();
            expect(mockFunction).toHaveBeenCalledTimes(0);
          });
        });
      });
    });

    context('notification does not exist', () => {
      it('should do nothing', () => {
        const htmlBefore = wrapper.html();
        reportConnectionSucceeded();
        wrapper.update();
        expect(wrapper.html()).toBe(htmlBefore);
      });
    });
  });
});
