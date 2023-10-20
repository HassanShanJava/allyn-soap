import { gql } from '@apollo/client';

const imageFragment = gql`
  fragment image on Image {
    url
    altText
    width
    height
  }
`;

export default imageFragment;
