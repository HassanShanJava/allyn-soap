import React from 'react';
import logo from '~/public/assets/logo.png';

import Head from 'next/head';
type seoType = {
  title: string;
  description: string;
  image_url: string;
};
const SeoHead = (props: seoType) => {
  return (
    <Head>
      <meta charSet="utf-8"></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0"
      ></meta>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"></meta>
      <meta name="description" content={props?.description}></meta>
      <meta name="keywords" content={props?.title}></meta>

      <meta
        property="og:site_name"
        content={`${props?.title} - Allyn's Soap Co`}
      />
      <meta property="og:url" content="https://allynssoapco.com/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`${props?.title} - Allyn's Soap Co`}
      ></meta>
      <meta property="og:description" content={props?.description}></meta>

      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta
        name="twitter:title"
        content={`${props?.title} - Allyn's Soap Co`}
      ></meta>
      <meta name="twitter:description" content={props?.description}></meta>
      <meta property="og:image" content={props?.image_url} />
      <meta property="og:image:secure_url" content={props?.image_url} />
      <meta property="og:image:width" content="2050" />
      <meta property="og:image:height" content="780" />
      <title>{`${props?.title} - Allyn's Soap Co`}</title>

      <link rel="icon" href={logo.src} sizes="any" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </Head>
  );
};

// This gets called on every request

export default SeoHead;
