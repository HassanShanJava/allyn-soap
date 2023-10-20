// apolloClient.js
 import { useMemo } from "react";
 import { ApolloClient, HttpLink, InMemoryCache,createHttpLink,NormalizedCacheObject } from "@apollo/client";
const apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined", 
  link: new HttpLink({
    uri: `https://${process.env.SHOPIFY_STORE_DOMAIN ?? ''}/api/2023-01/graphql.json`, // Replace with your Shopify store URL
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '', // Replace with your Shopify access token
    },
  }),
  cache: new InMemoryCache(),
});

export function makeApolloClient({ token }: any): ApolloClient<NormalizedCacheObject> {
    // create an apollo link instance, a network interface for apollo client
    const link = createHttpLink({
            uri: `https://${process.env.SHOPIFY_STORE_DOMAIN ?? ''}/api/2023-01/graphql.json`, // Replace with your Shopify store URL

        headers: {
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? '', // Replace with your Shopify access token
    },
    });
    // create an inmemory cache instance for caching graphql data
    const cache = new InMemoryCache()
    // instantiate apollo client with apollo link instance and cache instance
    const client = new ApolloClient({
        link: link as any,
        cache
    });
    return client;
}

 
export default apolloClient;
