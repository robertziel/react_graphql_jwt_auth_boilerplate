import { useState } from 'react';
import useIsMounted from 'react-is-mounted-hook';
import { useMutation as useMutationApollo } from '@apollo/client';
import apiFetch from './apiFetch';

export default function useMutation(mutation) {
  const isMounted = useIsMounted();
  const [processing, setProcessing] = useState(false);

  [mutate, options] = useMutationApollo(mutation);

  const component = {
    isMounted,
    processing,
    setProcessing,
  };

  return [mutate, options];
}
