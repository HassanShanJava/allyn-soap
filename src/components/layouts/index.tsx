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
  const router = useRouter();

  const Layout = router.asPath.startsWith('/admin') ? AppLayout : AppLayout;

  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <ThemeProvider attribute="class" >
        <SeoHead/>
        <AppLayout>{children}</AppLayout>

      </ThemeProvider>
    </Provider>
  );
}
