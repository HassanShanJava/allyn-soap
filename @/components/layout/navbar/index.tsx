"use client"
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const { SITE_NAME } = process.env;

export default async function Navbar({ menu }: any) {
  const [color, setColor] = useState(false);

  useEffect(() => {
    const changeColor = () =>
      window.scrollY >= 80 ? setColor(true) : setColor(false);

    window.addEventListener('scroll', changeColor);

    return () => {
      console.log(color)
      window.removeEventListener('scroll', changeColor);
    };
  }, []);
  

  return (
    <nav className={`sticky top-0 bg-white  flex items-center justify-between  max-w-[1600px] mx-auto`}>
      <div className={`flex justify-between gap-6 w-full items-center   transform ease-in-out   ${color?"bg-white duration-300":"bg-secondary duration-300"} p-6 lg:px-12`}>
        <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
          <Image src='/logo.png' alt='/' priority={true} width={100} height={100} />
        </Link>

        {menu.length ? (
          <ul className="hidden sm:flex gap-4 text-sm  text-text-dark  md:flex-row  md:items-center ">
            {menu.map((item: Menu) => (
              <li key={item.title} className=' captialize-first  lowercase hover:font-semibold hover:text-primary  hover:cursor-pointer '>
                 {item.title}
              </li>
            ))}
          </ul>
        ) : ""}
      </div>

      <div className='w-[15%] p-4 lg:px-6 flex text-text-dark  gap-3 justify-center text-lg items-center'>
        <i className='fas fa-magnifying-glass  text-center text-xl'></i>
        <i className='fas fa-shopping-cart  text-center text-xl'></i>
        <i className='fas fa-user  text-center text-xl'></i>
      </div>
    </nav>
  );
}
