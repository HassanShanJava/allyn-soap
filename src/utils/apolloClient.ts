import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `https://${
        process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN as string
      }.myshopify.com/api/2023-10/graphql.json`, // Replace with your Shopify store URL
      headers: {
        'X-Shopify-Storefront-Access-Token': process.env
          .NEXT_PUBLIC_SHOPIFY_HEADER as string, // Replace with your Shopify access token
      },
    }),
    cache: new InMemoryCache(),
  });
};
export default apolloClient;
