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
    query: (config) => apiFetch('query', component, config),
    mutate: (config) => apiFetch('mutate', component, config),
    processing,
  };
}
