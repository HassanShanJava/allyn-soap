import { gql } from '@apollo/client';

export const SignUpMutation = gql`
  mutation MyRegister(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    customerCreate(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      customer {
        id
        email
        firstName
        displayName
      }
    }
  }
`;

export const LoginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
