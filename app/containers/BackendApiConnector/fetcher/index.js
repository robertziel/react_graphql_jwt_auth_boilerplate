import { useState } from 'react';
import useIsMounted from 'react-is-mounted-hook';
import apiFetch from './apiFetch';

export default function useApiFetcher() {
  const isMounted = useIsMounted();
  const [processing, setProcessing] = useState(false);

  const component = {
    isMounted,
    processing,
    setProcessing,
  };

  return {
    delete: (config) => apiFetch('DELETE', component, config),
    get: (config) => apiFetch('GET', component, config),
    post: (config) => apiFetch('POST', component, config),
    processing,
  };
}
