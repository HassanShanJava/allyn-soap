import { gql } from '@apollo/client';

export const getCustomerQuery = gql`
  query MyQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      displayName
      email
      firstName
      id
      lastName
      numberOfOrders
      phone
      tags
      updatedAt
      createdAt
      acceptsMarketing
    }
  }
`;
