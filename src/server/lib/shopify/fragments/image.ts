import { gql } from '@apollo/client';

const imageFragment = gql`
  fragment image on Image {
    url(transform: { preferredContentType: WEBP })
    transformedSrc(preferredContentType: WEBP)
    altText
    width
    height
  }
`;

export default imageFragment;
