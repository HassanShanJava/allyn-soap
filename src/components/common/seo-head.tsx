import React from 'react';
import Head from 'next/head';
import logo from "~/public/assets/logo.png"

const SeoHead = () => {
  return (
    <Head>
      <meta charSet="utf-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0"></meta>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"></meta>
      <meta name="description"
        content="Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand."></meta>
      <meta name="keywords" content="Allyn's Soap Co."></meta>

      <meta property="og:title" content="Allyn's Soap Co."></meta>
      <meta property="og:description"
        content="Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand."></meta>
      
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:title" content="Allyn's Soap Co."></meta>
      <meta name="twitter:description"
        content="Allyn's Soap Co., the prestige car raffle company that offers car enthusiasts the thrilling opportunity to win their coveted dream car and many other prizes."></meta>
      <title>Allyn's Soap Co.</title>

      <link
        rel="icon"
        href={logo.src}
        sizes='any'
      />
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
