import { gql } from '@apollo/client';
import productFragment from './product';

const cartFragment = gql`
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    discountAllocations {
      discountedAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          discountAllocations {
            discountedAmount {
              amount
              currencyCode
            }
            ... on CartCodeDiscountAllocation {
              __typename
              code
              discountedAmount {
                amount
                currencyCode
              }
            }
            ... on CartCustomDiscountAllocation {
              __typename
              discountedAmount {
                amount
                currencyCode
              }
              title
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${productFragment}
`;

export default cartFragment;
