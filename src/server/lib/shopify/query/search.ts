import { gql } from '@apollo/client';
import productFragment from '../fragments/product';
export const getSearchProductsQuery = gql`
query searchProducts(
  $query: String!
    $reverse: Boolean
    $first: Int
    $last: Int
    $after: String
    $before: String
) {
  search(
    query:$query
    reverse: $reverse
    first: $first
    last: $last
    after: $after
    before: $before
    types: PRODUCT) {
    edges {
      node {
        ... on Product {
          ...product
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
${productFragment}
`