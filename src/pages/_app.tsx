import {
  ApolloProvider,
  ApolloClient,
  useQuery,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import { useState, type ReactElement, type ReactNode, useEffect } from 'react';
import Layout from '~/components/layouts';
import '~/styles/globals.css';
import { makeApolloClient } from '~/utils/apolloClient';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <main className={'font-poppins'}>
        <Layout>{page}</Layout>
      </main>
    ));

  return getLayout(
    <main className={'font-poppins'}>
      <Component {...pageProps} />
    </main>
  );
}) as AppType;

export default MyApp;
