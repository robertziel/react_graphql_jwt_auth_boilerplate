import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation authSignUp(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    authSignUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      success
      errors {
        message
        path
      }
    }
  }
`;
