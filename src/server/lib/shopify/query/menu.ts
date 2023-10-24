import { gql } from '@apollo/client';

export const getMenuQuery = gql`
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        type
        title
        url
      }
    }
  }
`;
export const getFilterQuery = gql`
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        type
        title
        url
        items {
          id
          tags
          title
          type
          url
        }
      }
    }
  }
`;
