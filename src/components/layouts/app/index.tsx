import React, { ReactNode, Suspense } from 'react';
import Header from './header';

import Footer from './footer';
import { Toaster } from '~/components/ui/toaster';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Poppins } from 'next/font/google';
import CartSheet from '~/components/common/drawer/cart-drawer';

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

type DefaultLayoutProps = { children: ReactNode };

function Index({ children }: DefaultLayoutProps) {
  const apolloClient = new ApolloClient({
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

  return (
    <div
      className={` relative ${poppins.variable} ${poppins.className} max-w-[1600px] mx-auto w-full `}
    >
      {/* <SplashScreen /> */}
      <ApolloProvider client={apolloClient}>
        <Header />
        <Toaster />
        <Suspense fallback={<p>Loading layout</p>}>
          {children}
          <CartSheet />
        </Suspense>
        <Footer />
      </ApolloProvider>
    </div>
  );
}

export default Index;
