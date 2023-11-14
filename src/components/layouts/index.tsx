import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '~/store/store';
import AppLayout from './app';

// import Icon from '~/public/assets/favicon.png';
import { Toaster } from 'react-hot-toast';
type DefaultLayoutProps = { children: ReactNode };

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AppLayout>{children}</AppLayout>
      </ThemeProvider>
    </Provider>
  );
}
