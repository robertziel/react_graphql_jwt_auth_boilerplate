// import useIsMounted from 'react-is-mounted-hook';
import { useQuery as useQueryApollo } from '@apollo/client';

export function useQuery(query, options) {
  // const isMounted = useIsMounted();

  // const component = {
  //   isMounted,
  // };

  const apollo = useQueryApollo(query, options);

  return apollo;
}
