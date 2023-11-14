import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '~/store/store';
import AppLayout from './app';
import { useRouter } from 'next/router';

// import Icon from '~/public/assets/favicon.png';
import { Toaster } from 'react-hot-toast';
import SeoHead from '../common/seo-head';
type DefaultLayoutProps = { children: ReactNode };

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <SeoHead
          title="Allyn's Soap Co."
          description="Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand."
          image_url={
            'https://cdn.shopify.com/s/files/1/0372/6124/6603/files/fb_logo_with_kraft_paper.png?v=1613915363'
          }
        />
        <AppLayout>{children}</AppLayout>
      </ThemeProvider>
    </Provider>
  );
}
