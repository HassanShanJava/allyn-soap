// apolloClient.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${process.env.SHOPIFY_STORE_DOMAIN ?? ''}/api/2023-01/graphql.json`, // Replace with your Shopify store URL
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '', // Replace with your Shopify access token
    },
  }),
  cache: new InMemoryCache(),
});

export default apolloClient;