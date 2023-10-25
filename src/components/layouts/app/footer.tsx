import Link from 'next/link';
import React, { useState } from 'react';
import { Menu } from '~/server/lib/shopify/type';
import { getMenuQuery } from '~/server/lib/shopify/query/menu';
import { useQuery } from '@apollo/client';
import { getRoutData, removeEdgesAndNodes } from '~/utils/helper';
import LogoImage from '~/public/assets/logo.png';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface LinkItemProps {
  name: string;
  link: string;
  icon: string;
  disable?: boolean;
}

const Socials = [
  {
    name: 'facebook',
    icon: 'fa-brands fa-facebook-f',
    link: 'https://www.facebook.com/AllynsSoapCo/',
    lucide: <Facebook />,
  },
  {
    name: 'instrgram',
    icon: 'fa-brands fa-instagram',
    link: 'https://www.instagram.com/allynssoapco/',
    lucide: <Instagram />,
  },
  {
    name: 'twitter',
    icon: 'fa-brands fa-twitter',
    link: 'https://twitter.com/AllynsSoapCo',
    lucide: <Twitter />,
  },
];

function Footer() {
  const { error, data } = useQuery(getMenuQuery, {
    variables: { handle: 'footer' },
  });
  const footerData = data?.menu?.items;

  return (
    <section id="footer">
      {/* relative bottom-0 */}
      <footer className=" p-6 lg:px-12  lg:pb-16 flex flex-col md:flex-row bg-secondary  justify-between item-start gap-4">
        <div className="md:w-1/2 lg:w-2/6">
          <div>
            <Link
              href="/"
              className=" flex w-full items-center  md:w-auto lg:mr-6"
            >
              <Image src={LogoImage} alt="/" width={80} height={80} />
            </Link>

            <p className="py-7 font-[300] w-full md:max-w-[280px] text-base text-text-dark">
              At Allyn's Soap Co., we create skincare with a personal touch.
              Handcrafting in small batches with pure ingredients and an
              eco-friendly ethos, we deliver quality with a natural twist.
            </p>
          </div>
        </div>

        <div className="w-1/2 lg:w-4/6  grid grid-col-1  sm:grid-col-2 gap-y-6 gap-x-2 lg:gap-6 lg:grid-cols-3 justify-between text-text-dark ">
          <div className="space-y-6 ">
            <p className="font-[600] text-lg">Useful links</p>
            <ul className="space-y-6">
              {footerData &&
                footerData.map((item: any, i: number) => (
                  <li key={i} className="">
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-6">
            <p className="font-[600] text-lg">Company</p>
            <ul className="space-y-6">
              <li className="">
                <Link href={'/'}>Faqs</Link>
              </li>
              <li className="">
                <Link href={'/'}>About</Link>
              </li>
              <li className="">
                <Link href={'/'}>Help</Link>
              </li>
              <li className="">
                <Link href={'/'}>Blogs</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <p className="font-[600] text-lg">Contact Us</p>
            <ul className="space-y-6">
              <li className="">
                <Link href={'/'}>info@AllynsSoapCo.com</Link>
              </li>
              <li className="">
                <Link href={'https://www.facebook.com/AllynsSoapCo/'}>
                  www.facebook.com/AllynsSoapCo/
                </Link>
              </li>
              <li className="">
                <Link href={'/'}>@AllynsSoapCo</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex md:hidden gap-4 justify-start">
          {Socials.map((social, i) => (
            <Link
              href={social.link}
              key={i}
              className="rounded-full font-[500] text-text-dark hover:text-primary text-sm w-9 h-9 flex justify-center items-center bg-primary hover:bg-white"
            >
              {/* <i className={`${social.icon}`}></i> */}
              {social.lucide}
            </Link>
          ))}
        </div>
      </footer>
      <div className="flex justify-between bg-primary items-center p-2 md:p-6 lg:px-12">
        <div className="hidden md:flex gap-4 justify-between">
          {Socials.map((social, i) => (
            <Link
              href={social.link}
              key={i}
              className="rounded-full text-text-dark hover:text-primary text-lg w-10 h-10 flex justify-center items-center bg-white"
            >
              {/* <i className={`${social.icon}`}></i> */}
              {social.lucide}
            </Link>
          ))}
        </div>
        <div className="w-full text-white">
          <p className="w-full text-xs md:text-base text-center">
            Copyright © 2023, Allyn's Soap Co. Powered by Shopify
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
