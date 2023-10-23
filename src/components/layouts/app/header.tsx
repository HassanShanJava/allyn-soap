import React, { useEffect, useState } from 'react';
import { Button } from '@/ui/button';
import LogoImage from '~/public/assets/logo.png';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useRouter } from 'next/router';
import { toggleLang } from '~/store/reducers/layout';
import { RootState } from '~/store/store';
import Link from 'next/link';
import langContent from '~/locales';
import { useToast } from '~/components/ui/use-toast';
import { getMenuQuery } from '~/server/lib/shopify/query/menu';

import { useQuery } from '@apollo/client';
import { removeEdgesAndNodes } from '~/utils/helper';
import { Menu } from '~/server/lib/shopify/type';

export default function Header() {
  const router = useRouter();

  const [color, setColor] = useState(false);
  const [nav, setNav] = useState<boolean>(false);
const {  error, data } = useQuery(getMenuQuery, {
    variables: { handle:'main-menu' },
  });


  useEffect(() => {
    const changeColor = () =>
      window.scrollY >= 100 ? setColor(true) : setColor(false);

    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  return (
       <nav className={`fixed  w-full top-0 bg-white z-40 flex items-center justify-between   max-w-[1600px] mx-auto ${color?"shadow-xl":""}`}>
      {/* for bg color */}
      <div className={`flex  justify-start xl:justify-between lg:gap-4 xl:gap-6 min-w-[200px] w-full max-w-[60%]  md:max-w-[80%] items-center  ${color ? "!bg-white transform ease-in-out duration-500 " : "bg-[#ebfcf7] transform ease-in-out duration-500"}   transform ease-in-out    p-6 lg:px-12 lg:py-6 `}>
        <Link href="/" className="mr-2 flex w-full items-center  md:w-auto lg:mr-6">
          <Image src={LogoImage} alt='/' width={80} height={80} />
        </Link>

        {data?.menu?.items.length ? (
          <ul className="hidden xl:flex gap-4 text-sm  text-text-dark  xl:flex-row  xl:items-center ">
            {data?.menu?.items?.map((item: Menu) => (
              <li key={item.title} className=' captialize-first  lowercase font-semibold hover:text-primary  hover:cursor-pointer '>
                {item.title}
              </li>
            ))}
          </ul>
        ) : ""}
      </div>

      <div className=' w-[40%] md:w-[20%]  p-6 lg:px-12 flex text-text-dark  gap-4 justify-center text-lg items-center'>
        <i className='fas fa-magnifying-glass  text-center text-xl'></i>
        <i className='fas fa-shopping-cart  text-center text-xl'></i>
        <i className='fas fa-user  text-center text-xl'></i>
      </div>
    </nav>
  );
}




