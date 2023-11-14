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
export const getPageDetail = gql`
  query MyQuery($handle: String!) {
    pageByHandle(handle: $handle) {
      id
      bodySummary
      body
      title
      seo {
        description
        title
      }
      onlineStoreUrl
    }
  }
`;
export const getTermsDetail = gql`
  query MyQuery {
    shop {
      termsOfService {
        body
        handle
        title
        id
      }
    }
  }
`;
