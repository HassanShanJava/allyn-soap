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
      defaultAddress {
        address1
        address2
        city
        company
        country
        countryCode
        countryCodeV2
        firstName
        id
        lastName
        latitude
        longitude
        name
        phone
        province
        provinceCode
      }
    }
  }
`;
export const getCustomerAddressQuery = gql`
  query MyQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      addresses(first: 10) {
        edges {
          node {
            address1
            address2
            city
            company
            country
            countryCode
            countryCodeV2
            firstName
            formattedArea
            id
            lastName
            latitude
            longitude
            name
            phone
            province
            provinceCode
            zip
          }
        }
      }
    }
  }
`;
export const AddCustomerAddressQuery = gql`
  mutation MyMutation(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    )
  }
`;
