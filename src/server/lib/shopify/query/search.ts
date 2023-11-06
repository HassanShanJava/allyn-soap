import { gql } from '@apollo/client';
import productFragment from '../fragments/product';
export const getSearchProductsQuery = gql`
query MyQuery($query: String = "soap ", $first: Int = 10) {
  search(query: $query, first: $first) {
    edges {
      node {
        ... on Product {
          title
          totalInventory
          availableForSale
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}`