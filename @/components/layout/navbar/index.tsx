"use client"
import { Menu } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default async function Navbar({ menu }: any) {
  const [color, setColor] = useState(false);

  // useEffect(() => {
  //   const changeColor = () =>
  //   window.scrollY >= 100 ? setColor(true) : setColor(false);
    
  //   window.addEventListener('scroll', changeColor);
    
  //   return () => {
      
  //     window.removeEventListener('scroll', changeColor);
  //   };
  // }, []);
  // console.log(color,"color")


  return (
    <nav className={`sticky top-0 bg-white z-40 flex items-center justify-between   max-w-[1600px] mx-auto`}>
      {/* for bg color */}
      <div className={`flex  justify-start xl:justify-between lg:gap-4 xl:gap-6 min-w-[300px] w-full  max-w-[80%] items-center  ${color ? "!bg-white transform ease-in-out duration-500 shadow-xl" : "bg-[#ebfcf7] transform ease-in-out duration-500"}   transform ease-in-out    p-6 lg:px-12 lg:py-6 `}>
        <Link href="/" className="mr-2 flex w-full items-center  md:w-auto lg:mr-6">
          <img src='/logo.png' alt='/' width={80} height={80} />
        </Link>

        {menu.length ? (
          <ul className="hidden xl:flex gap-4 text-sm  text-text-dark  xl:flex-row  xl:items-center ">
            {menu.map((item: Menu) => (
              <li key={item.title} className=' captialize-first  lowercase font-semibold hover:text-primary  hover:cursor-pointer '>
                {item.title}
              </li>
            ))}
          </ul>
        ) : ""}
      </div>

      <div className='w-[20] p-6 lg:px-12 flex text-text-dark  gap-4 justify-center text-lg items-center'>
        <i className='fas fa-magnifying-glass  text-center text-xl'></i>
        <i className='fas fa-shopping-cart  text-center text-xl'></i>
        <i className='fas fa-user  text-center text-xl'></i>
      </div>
    </nav>
  );
}
