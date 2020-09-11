import { gql } from '@apollo/client';

export const AUTH_LOGIN_MUTATION = gql`
  mutation authLogin($email: String!, $password: String!) {
    authLogin(password: $password, email: $email) {
      token
    }
  }
`;
