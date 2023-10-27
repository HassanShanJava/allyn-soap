import React, { ReactNode, Suspense, useEffect } from 'react';
import Header from './header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import Footer from './footer';
import { Toaster } from '~/components/ui/toaster';
import { useRouter } from 'next/router';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { makeApolloClient } from '~/utils/apolloClient';
import { Poppins } from 'next/font/google';
import CartSheet from '~/components/common/drawer/cart-drawer';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

type DefaultLayoutProps = { children: ReactNode };

function Index({ children }: DefaultLayoutProps) {
  const router = useRouter();

  const apolloClient = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `https://allyns-soap-co.myshopify.com/api/2023-01/graphql.json`, // Replace with your Shopify store URL
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
