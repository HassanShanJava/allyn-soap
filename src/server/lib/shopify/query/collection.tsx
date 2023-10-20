import { gql } from "@apollo/client";
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