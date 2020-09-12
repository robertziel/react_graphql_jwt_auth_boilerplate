// import useIsMounted from 'react-is-mounted-hook';
import { useMutation as useMutationApollo } from '@apollo/client';

export function useMutation(mutation, options) {
  // const isMounted = useIsMounted();

  // const component = {
  //   isMounted,
  // };

  const apollo = useMutationApollo(mutation, options);

  return apollo;
}
