import { gql } from '@apollo/client';
import productFragment from '../fragments/product';

export const getProductsQuery = gql`
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
    $first: Int!
    $handle: String!
  ) {
    products(
      sortKey: $sortKey
      reverse: $reverse
      query: $query
      first: $first
      handle: $handle
    ) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;
