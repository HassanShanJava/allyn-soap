import React, { useState } from 'react';
import { Button } from '@/ui/button';
import Image from 'next/image';
import Lines from '~/public/assets/icons/Lines_Big.png';
import Group16 from '~/public/assets/icons/Group16.svg';
import Group17 from '~/public/assets/icons/Group17.png';
import Glow from '~/components/common/glow';
import Link from 'next/link';
import langContent from '~/locales';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useRouter } from 'next/router';

interface LinkItemProps {
  name: string;
  link: string;
  icon: string;
  disable?: boolean;
}
function Footer() {


  return (
    <footer className="h-full  bg-background-footer !z-50">
      
    </footer>
  );
}

export default Footer;

export function ItemMenuDemo() {
  const linkItems: Array<LinkItemProps> = [
    { name: 'Cars', link: '/', icon: 'fas fa-house' },
    {
      name: 'Cash',
      link: `/#`,
      icon: 'fa-solid fa-globe',
    },
    {
      name: 'Winners',
      link: `/#`,
      icon: 'fa-sharp fa-regular fa-images',
    },
    {
      name: 'About Us',
      link: `/#`,
      icon: 'fa-solid fa-image',
    },
    {
      name: 'FAQ',
      link: `/faq`,
      icon: 'fa-solid fa-users',
    },
  ];
  return (
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto "
      id="navbar-sticky"
    >
      <ul className="flex flex-col p-4 md:p-0  text-small font-normal  border  rounded-lg bg-transparent md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white dark:bg-transparent ">
        {linkItems &&
          linkItems?.map((item, index) => {
            return (
              <li key={index} className="group border-b-2 border-transparent  ">
                <a
                  href="#"
                  className="flex flex-col py-2 pl-3 pr-4 text-gray-200   hover:bg-gray-100  md:hover:bg-transparent  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {item?.name}
                  <span className="w-full h-1 bg-transparent group-hover:bg-teal mt-1 rounded-sm  "></span>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
