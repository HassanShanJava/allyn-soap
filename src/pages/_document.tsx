import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <script
          src="https://cdn-widgetsrepository.yotpo.com/v1/loader/5m8xhAHtJf2ak4R6ihcYA08d9QdD7NNTDkVromWz"
          async
        ></script>

        <Script
          src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${process.env.NEXT_PUBLIC_SHOPIFY_REVIEW}`}
          async
        ></Script>
        <meta name="color-scheme" content="light only" />
      </Head>
      <body className={`font-poppins`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
