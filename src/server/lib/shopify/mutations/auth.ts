import { gql } from '@apollo/client';
import cartFragment from '../fragments/cart';

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

export const LogoutMutation = gql`
  mutation MyMutation($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
    }
  }
`;

export const CartUpdateMutation = gql`
  mutation MyMutation($cartId: ID!, $customerAccessToken: String!) {
    cartBuyerIdentityUpdate(
      buyerIdentity: { customerAccessToken: $customerAccessToken }
      cartId: $cartId
    ) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;


export const recoverAccountMutation = gql`
  mutation MyMutation($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const resetAccountMutation = gql`
  mutation MyMutation($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
    }
  }
`;
