import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

import CroppImageModal from 'components/CroppImageModal';
import IntlCatcher from 'containers/LanguageProvider/IntlCatcher';
import NotificationSystem from 'containers/NotificationsSystem';
import ConfigureTestStore from 'testsHelpers/ConfigureTestStore';
import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';

import dataUrlToFile from 'utils/dataUrlToFile';
import exampleImage from 'images/icon-512x512.png';
import AvatarForm from '../index';

/* eslint-disable react/prop-types */
// Mock CroppImageModal required by AvatarForm
jest.mock('components/CroppImageModal/index', () => ({ onSubmit }) => (
  <button
    onClick={() =>
      onSubmit(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
      )
    }
    type="submit"
  >
    CroppImageModal
  </button>
));
/* eslint-enable react/prop-types */

const showPath = '/profile/avatar';
const updatePath = showPath;
const showResponseBody = { avatar: exampleImage };

let store;
let wrapper;

function mountWrapper() {
  return mount(
    <IntlProvider locale="en">
      <IntlCatcher>
        <Provider store={store}>
          <NotificationSystem />
          <AvatarForm />
        </Provider>
      </IntlCatcher>
    </IntlProvider>,
  );
}

async function configureWrapper() {
  store = new ConfigureTestStore().store;
  await act(async () => {
    wrapper = mountWrapper();
  });
}

describe('<AvatarForm />', () => {
  beforeEach(() => {
    configureWrapper();
  });

  loadApiFetchMock({
    method: 'GET',
    path: showPath,
    responseBody: showResponseBody,
    status: 200,
  });

  loadApiFetchMock({
    method: 'POST',
    path: updatePath,
    requestBody: {
      avatar: dataUrlToFile(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==',
        'avatar.jpg',
      ),
    },
    responseBody: showResponseBody,
    status: 200,
  });

  it('should upload image via cropper', async () => {
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find('.file-input input').length).toBe(1);
    });
    const blob = new Blob(['foo'], { type: 'image/jpg' });
    wrapper.find('.file-input input').simulate('change', {
      target: {
        files: [blob],
      },
    });
    wrapper.find(CroppImageModal).simulate('click', { button: 0 });
  });
});
