
import Navbar from '@/components/layout/navbar';
import { getMenu } from 'lib/shopify';
import { ensureStartsWith } from 'lib/utils';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';


const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  description: "Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand",
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
    twitter: {
      card: 'summary_large_image',
      creator: twitterCreator,
      site: twitterSite
    }
  })
};


const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default async function RootLayout({ children }: { children: ReactNode }) {

  const menu = await getMenu('main-menu');

  // console.log({ menu }, "menu2")
 
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />


      </head>

      <body className='w-full max-w-[1600px] mx-auto'>

        <Navbar menu={menu} />
        <main>{children}</main>

      </body>
    </html>
  );
}
