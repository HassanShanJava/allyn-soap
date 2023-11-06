import { gql } from '@apollo/client';

export const removeFromCartMutation = gql`
  mutation MyRegister(
    $email: String
    $firstName: String
    $lastName: String
    $password: String
    $phone: String
  ) {
    customerCreate(
      input: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phone: $phone
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
