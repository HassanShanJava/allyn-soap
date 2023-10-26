import { gql } from '@apollo/client';
import productFragment from '../fragments/product';
export const getCollectionsQuery = gql`
  query getCollections {
    collections(first: 199) {
      edges {
        node {
          id
          handle
          description
          title
          products(first: 10) {
            filters {
              values {
                count
              }
            }
          }
          image {
            id
            src
            url
            altText
          }
        }
      }
    }
  }
`;

export const getCollectionProductsQuery = gql`
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $first: Int
    $last: Int
    $after: String
    $before: String
    $price: PriceRangeFilter
  ) {
    collection(handle: $handle) {
      products(
        sortKey: $sortKey
        reverse: $reverse
        first: $first
        last: $last
        after: $after
        before: $before
        filters: { price: $price }
      ) {
        edges {
          cursor
          node {
            ...product
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
  }
  ${productFragment}
`;
