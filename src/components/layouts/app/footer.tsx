import Link from 'next/link';
import React, { useState } from 'react';
import { Menu } from '~/server/lib/shopify/type';
import { getMenuQuery } from '~/server/lib/shopify/query/menu';
import { useQuery } from '@apollo/client';
import { getRoutData, removeEdgesAndNodes } from '~/utils/helper';
import LogoImage from '~/public/assets/logo.png';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';

interface LinkItemProps {
  name: string;
  link: string;
  icon: string;
  disable?: boolean;
  mail?: string;
}

const Socials = [
  {
    name: 'email',
    icon: 'fa-brands fa-facebook-f',
    mail: 'info@AllynsSoapCo.com',
    lucide: <Mail />,
  },
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

const Company = [
  {
    link: 'Faqs',
  },
  {
    link: 'About',
  },
  {
    link: 'Help',
  },
  {
    link: 'Blogs',
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
      <footer className=" p-6 lg:px-12  lg:py-12 flex flex-col md:flex-row bg-secondary  justify-between item-start gap-4">
        <div className="w-full">
          <div>
            <Link
              href="/"
              className=" flex w-full items-center  md:w-auto lg:mr-6"
            >
              <Image src={LogoImage} alt="/" width={80} height={80} />
            </Link>

            <p className="py-7 font-[300] w-full md:max-w-[340px] text-base text-text-dark">
              {`At Allyn's Soap Co., we create skincare with a personal touch.
              Handcrafting in small batches with pure ingredients and an
              eco-friendly ethos, we deliver quality with a natural twist.`}
            </p>
          </div>
        </div>

        <div className="w-full  grid grid-cols-1 text-text  sm:grid-cols-3 gap-y-6 gap-x-2 lg:gap-6  justify-between text-text-dark pt-10">
          <div className="space-y-6 ">
            <p className="font-[600] text-xl">Useful links</p>
            <ul className="space-y-6 text-sm sm:text-base font-medium text-text-dark-gray">
              {footerData &&
                footerData.map((item: any, i: number) => (
                  <li key={i} className="">
                    <Link
                      href={`/${getRoutData(item.url) ?? '#'}`}
                      // href={item.url}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-6">
            <p className="font-[600] text-xl">Company</p>
            <ul className="space-y-6 text-sm sm:text-base font-medium text-text-dark-gray">
              {Company.map((item, i) => (
                <li className="">
                  <Link href={'#'}>{item.link}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 ">
            <p className="font-[600] text-xl">Contact Us</p>
            <ul className="space-y-6 text-sm md:text-base font-medium text-text-dark-gray">
              {Socials.map((social, i) => (
                <li key={i}>
                  <Link
                    href={
                      social.link ? social.link : `mailto:${social.mail}` || '/'
                    }
                    className="group"
                  >
                    <div className="flex justify-start gap-2 items-center ">
                      <div className="rounded-full text-text-dark group-hover:text-primary text-lg w-10 h-10 flex justify-center items-center bg-white">
                        {social.lucide}
                      </div>
                      <p className="capitalize group-hover:text-primary">
                        {social.name}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
      <div className="flex justify-between bg-primary items-center p-2 md:p-3 lg:px-12">
        <div className="w-full text-white">
          <p className="w-full text-xs md:text-base text-center">
            {` Copyright © 2023, Allyn's Soap Co. Powered by Shopify`}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
