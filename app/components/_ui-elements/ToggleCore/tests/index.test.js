import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';

import ToggleCore from '../index';

const defaultEnMessage = 'someContent';
const defaultPlMessage = 'someOtherContent';

const messages = defineMessages({
  en: {
    id: 'en',
    defaultMessage: defaultEnMessage,
  },
  pl: {
    id: 'en',
    defaultMessage: defaultPlMessage,
  },
});

describe('<ToggleCore />', () => {
  let store;

  describe('render', () => {
    let wrapper;

    function mountWrapper(values) {
      return mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <ToggleCore values={values} messages={messages} />
          </IntlProvider>
        </Provider>,
      );
    }

    beforeAll(() => {
      store = new ConfigureTestStore().store;
    });

    it('should contain default text', () => {
      wrapper = mountWrapper(['en', 'pl']);
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should not have ToggleCoreOptions if props.values is not defined', () => {
      wrapper = mountWrapper(null);
      expect(wrapper.find('.MuiList')).toHaveLength(0);
    });
  });
});
