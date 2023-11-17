import { gql } from '@apollo/client';

export const getCustomerQuery = gql`
  query MyQuery(
    $customerAccessToken: String = ""
    $reverse: Boolean
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
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
      addresses(
        reverse: $reverse
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
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
        zip
      }
    }
  }
`;
export const getCustomerAddressQuery = gql`
  query MyQuery(
    $customerAccessToken: String!
    $reverse: Boolean
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      addresses(
        reverse: $reverse
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
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

export const orderAccountQuery = gql`
  query MyQuery(
    $customerAccessToken: String = ""
    $reverse: Boolean
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(
        reverse: $reverse
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          node {
            email
            fulfillmentStatus
            orderNumber
            name
            shippingDiscountAllocations {
              allocatedAmount {
                amount
                currencyCode
              }
              discountApplication {
                allocationMethod
                targetSelection
                targetType
                value {
                  ... on MoneyV2 {
                    __typename
                    amount
                    currencyCode
                  }
                }
              }
            }
            originalTotalDuties {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            phone
            processedAt
            totalTax {
              amount
              currencyCode
            }
            totalPrice {
              amount
              currencyCode
            }
            subtotalPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
