/*
 * config: { method, path, requestBody, responseBody, status }
 *
 */

// Mock AvatarForm required by Profile
/* eslint-enable react/prop-types */

import fetchMock from 'fetch-mock';
import formDataFromJson from 'containers/BackendApiConnector/fetcher/formDataFromJson';
import { fullUrl } from 'containers/BackendApiConnector/fetcher/apiFetch';
jest.mock(
  'containers/BackendApiConnector/fetcher/formDataFromJson',
  () => (json) => JSON.stringify(json),
);

export default function loadApiFetchMock(config) {
  beforeAll(() => {
    fetchMock.mock(
      (url, opts) =>
        (!config.path || url === fullUrl(config.path, config.params)) &&
        (!config.requestBody ||
          opts.body === formDataFromJson(config.requestBody)) &&
        (!config.method || opts.method === config.method),
      {
        status: config.status,
        body: config.responseBody,
        throws: config.throws,
      },
    );
  });

  afterAll(() => {
    fetchMock.restore();
  });

  return fetchMock;
}
