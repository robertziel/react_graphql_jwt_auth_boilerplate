import { useState } from 'react';
import useIsMounted from 'react-is-mounted-hook';
import { useQuery as useQueryApollo } from '@apollo/client';
import apiFetch from './apiFetch';

export default function useQuery(query, options) {
  const isMounted = useIsMounted();
  const [processing, setProcessing] = useState(false);

  const apollo = useQueryApollo(query, options);

  const component = {
    isMounted,
    processing,
    setProcessing,
  };

  return apollo;
}
