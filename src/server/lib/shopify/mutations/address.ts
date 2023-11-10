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
