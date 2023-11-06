import { gql } from '@apollo/client';
import productFragment from '../fragments/product';
export const getSearchProductsQuery = gql`
  query getSearchProducts(
    sortKey: $sortKey
        reverse: $reverse
        first: $first
        last: $last
        after: $after
        before: $before
        filters: { price: $price }
  ){
    search(query: $search, first: 10) {
        edges {
            cursor
            node {
              ...product
              totalInventory
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
  
  `