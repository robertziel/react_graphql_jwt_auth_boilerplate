import React from 'react';
import { mount } from 'enzyme';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';

import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import { translationMessages } from 'i18n';

import ConnectedLanguageProvider, { LanguageProvider } from '../index';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const wrapper = mount(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>,
    );
    expect(wrapper.find('h1')).toHaveLength(1);
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let store;

  beforeAll(() => {
    store = new ConfigureTestStore().store;
  });

  it('should render the default language messages', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>,
    );
    expect(wrapper.text()).toEqual(messages.someMessage.defaultMessage);
  });
});
