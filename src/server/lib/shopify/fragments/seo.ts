import { gql } from '@apollo/client';

const seoFragment = gql`
  fragment seo on SEO {
    description
    title
  }
`;

export default seoFragment;
