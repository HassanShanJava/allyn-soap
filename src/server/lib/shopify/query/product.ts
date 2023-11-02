import { gql } from '@apollo/client';
import productFragment from '../fragments/product';
export const getProductQuery = gql`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
      totalInventory
    }
    shop {
      paymentSettings {
        acceptedCardBrands
      }
    }
  }
  ${productFragment}
`;

export const getProductsQuery = gql`
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
    $first: Int!
  ) {
    products(
      sortKey: $sortKey
      reverse: $reverse
      query: $query
      first: $first
    ) {
      edges {
        node {
          ...product
          totalInventory
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = gql`
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;
