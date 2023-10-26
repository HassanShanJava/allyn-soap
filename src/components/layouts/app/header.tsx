import React, { useEffect, useState } from 'react';
import { Button } from '@/ui/button';
import LogoImage from '~/public/assets/logo.png';
import Image from 'next/image';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { getMenuQuery } from '~/server/lib/shopify/query/menu';

import { useQuery } from '@apollo/client';

import { Menu } from '~/server/lib/shopify/type';
import { getRoutData } from '~/utils/helper';
import { Search, ShoppingCart, User } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  const [color, setColor] = useState(false);
  const [nav, setNav] = useState<boolean>(false);
  const { error, data, loading } = useQuery(getMenuQuery, {
    variables: { handle: 'main-menu' },
  });
  console.log({ data }, 'menuData');

  useEffect(() => {
    const changeColor = () =>
      window.scrollY >= 100 ? setColor(true) : setColor(false);

    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  return (
    <nav
      className={`sticky  w-full top-0 bg-white z-40 flex items-center justify-between   max-w-[1600px] mx-auto ${
        color ? 'shadow-xl' : ''
      }`}
    >
      {/* for bg color */}
      <div
        className={`flex  justify-start xl:justify-between lg:gap-4 xl:gap-6 min-w-[200px] w-full max-w-[60%]  md:max-w-[80%] items-center  ${
          color
            ? '!bg-white transform ease-in-out duration-500 '
            : 'bg-secondary transform ease-in-out duration-500'
        }   transform ease-in-out    xs:p-6 lg:px-12 lg:py-6 `}
      >
        <Link
          href="/"
          className="mr-2 flex w-full items-center  md:w-auto lg:mr-6"
        >
          <Image src={LogoImage} alt="/" width={80} height={80} />
        </Link>

        {data?.menu?.items ? (
          <ul className="hidden xl:flex gap-4 text-sm  text-text-dark  xl:flex-row  xl:items-center ">
            {data?.menu?.items?.map((item: Menu) => (
              <Link
                key={item.title}
                href={
                  item?.type === 'COLLECTION' || item?.title !== 'Home'
                    ? `/products/${getRoutData(item?.url)}`
                    : `/`
                }
              >
                <li className=" captialize-first  lowercase font-semibold hover:text-primary  hover:cursor-pointer ">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          ''
        )}
      </div>

      <div className=" w-[40%] md:w-[20%]  p-6 lg:px-12 flex text-text-dark  gap-4 justify-center text-lg items-center">
        {/* <i className="fas fa-magnifying-glass  text-center text-xl"></i>
        <i className="fas fa-shopping-cart  text-center text-xl"></i>
        <i className="fas fa-user  text-center text-xl"></i> */}
        <Search />
        <ShoppingCart />
        <User />
      </div>
    </nav>
  );
}
