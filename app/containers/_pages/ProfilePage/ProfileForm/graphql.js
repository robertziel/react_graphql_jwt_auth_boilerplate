import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
  query {
    profile {
      firstName
      lastName
      email
    }
  }
`;

export const PROFILE_UPDATE_MUTATION = gql`
  mutation profileUpdate(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String
    $passwordConfirmation: String
  ) {
    profileUpdate(
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
