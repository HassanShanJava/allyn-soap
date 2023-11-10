import { gql } from '@apollo/client';

export const AddCustomerAddressQuery = gql`
  mutation MyMutation(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
        address1
        address2
        id
      }
    }
  }
`;

export const EditCustomerAddressQuery = gql`
  mutation MyMutation(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerAddress {
        address1
        address2
        id
      }
    }
  }
`;

export const DefaultAddressCustomerAddressQuery = gql`
  mutation MyMutation($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(
      addressId: $addressId
      customerAccessToken: $customerAccessToken
    ) {
      customer {
        firstName
        email
      }
    }
  }
`;

export const DeleteCustomerAddressQuery = gql`
  mutation MyMutation($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
    }
  }
`;
