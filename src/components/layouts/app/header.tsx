import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import LogoImage from '~/public/assets/logo.png';
import { getMenuQuery } from '~/server/lib/shopify/query/menu';

import { Search as SearchIcon } from 'lucide-react';

import { Menu } from '~/server/lib/shopify/type';
import { getRoutData } from '~/utils/helper';
import { getCartQuery } from '~/server/lib/shopify/query/cart';
import { RootState } from '~/store/store';
import { toggleCart, toggleCartModal } from '~/store/reducers/cart';
import SearchComponent from '~/components/common/search';
import { toggleAuth } from '~/store/reducers/auth';
import { CartUpdateMutation } from '~/server/lib/shopify/mutations/auth';

import { Form } from '~/components/ui/form';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
interface SideBarMenuProps {
  nav: boolean;
  closeFn: React.Dispatch<React.SetStateAction<boolean>>;
  list?: any;
}

const formSchema = z.object({
  search: z.string().min(2, {
    message: 'Enter product name',
  }),
});

export default function Header() {
  const [color, setColor] = useState(false);
  const [nav, setNav] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [navList, setNavList] = useState([]);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router?.query?.id ?? '';

  const [getCart, { data: cartData }] = useLazyQuery(getCartQuery);
  const [customerCartUpdate, { loading: customerCustomerUpdateLoading }] =
    useMutation(CartUpdateMutation);
  const { data } = useQuery(getMenuQuery, {
    variables: { handle: 'main-menu' },
  });
  // for changing color on scroll
  useEffect(() => {
    const changeColor = () =>
      window.scrollY >= 100 ? setColor(true) : setColor(false);

    window.addEventListener('scroll', changeColor);

    return () => {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);

  // for cart
  useEffect(() => {
    (async () => {
      if (window) {
        const cartID = localStorage.getItem('cartID');
        if (cartID) {
          const cartData = await getCart({ variables: { cartId: cartID } });
          if (cartData?.data?.cart) {
            dispatch(
              toggleCart({
                cart_id: cartID,
                cart: { ...cartData?.data?.cart },
              }),
            );
          }
        }
        const tokenID = await getCookie('allynssoapco_token');
        if (tokenID) {
          dispatch(
            toggleAuth({
              token_id: tokenID,
              is_login: true,
              user: null,
            }),
          );
          if (cart?.cart_id && cart?.cart?.buyerIdentity?.customer) {
            const customerCartData = await customerCartUpdate({
              variables: {
                cartId: cart?.cart_id,
                customerAccessToken: tokenID,
              },
            });
          }
        }
      }
    })();
  }, []);

  // for nav
  useEffect(() => {
    if (data) setNavList(data?.menu.items);
  }, [data]);
  // for cart
  useEffect(() => {
    console.log(router?.query, 'router?.query');
    if (router?.query?.status == 'true') {
      const cartID = localStorage.removeItem('cartID');

      dispatch(
        toggleCart({
          cart_id: null,
          cart: null,
        }),
      );
      router.replace('/');
    }
  }, [router?.query]);
  // for closing search on resize
  useEffect(() => {
    window.addEventListener('resize', () => setOpen(false));
    return () => {
      window.removeEventListener('resize', () => setOpen(false));
    };
  }, []);

  return (
    <nav
      className={`sticky  w-full top-0 bg-white  z-40 flex items-center justify-between   max-w-[1600px] mx-auto ${
        color ? 'shadow-xl' : ''
      }`}
    >
      {/* for bg color */}
      <div
        className={`flex  justify-start xl:justify-between lg:gap-4 xl:gap-6 min-w-[200px] w-full max-w-[70%]  md:max-w-[80%] items-center  ${
          color
            ? '!bg-white transform ease-in-out duration-300 '
            : 'bg-secondary transform ease-in-out duration-300'
        }   transform-all ease-in-out   p-4 xs:px-6 lg:px-12 lg:py-6 `}
      >
        <Link
          href="/"
          className="mr-2 flex w-full items-center  md:w-auto lg:mr-6 "
        >
          <Image src={LogoImage} alt="/" width={80} height={80} />
        </Link>

        {navList ? (
          <ul className="hidden xl:flex gap-4 text-sm  text-text-dark  xl:flex-row  xl:items-center ">
            {navList.map((item: Menu) => {
              return (
                <Link
                  key={item.title}
                  href={`/products/${getRoutData(item?.url)}`}
                >
                  <li
                    className={` captialize-first  lowercase font-semibold ${
                      id == getRoutData(item?.url)
                        ? 'text-primary'
                        : 'text-text-dark'
                    }  hover:text-primary  hover:cursor-pointer `}
                  >
                    {item.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          ''
        )}
      </div>

      <div>
        <div className=" hidden  md:w-fit  px-6  lg:px-12 xl:flex text-text-dark  gap-4 justify-center text-lg items-center">
          <div onClick={() => setOpen(!open)} className="cursor-pointer">
            <Search className="text-lg" />
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => {
              if (cart?.cart && cart?.cart?.totalQuantity > 0)
                dispatch(toggleCartModal());
            }}
          >
            {cart?.cart && cart?.cart?.totalQuantity > 0 && (
              <div className=" absolute text-sm -top-4 -right-2 p-1">
                {cart?.cart?.totalQuantity > 99
                  ? '99+'
                  : cart?.cart?.totalQuantity}
              </div>
            )}

            <ShoppingCart className="text-lg" />
          </div>
          <div>
            <Link href={user?.is_login ? '/my-account' : '/login'}>
              <User className="text-lg" />
            </Link>
          </div>
        </div>
        <div className={`${open ? 'block' : 'hidden'}`}>
          <SearchComponent open={open} setOpen={setOpen} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 py-6 xsm:p-6  xl:hidden w-[30%] md:w-[20%]">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            if (cart?.cart && cart?.cart?.totalQuantity > 0)
              dispatch(toggleCartModal());
          }}
        >
          {cart?.cart && cart?.cart?.totalQuantity > 0 && (
            <div className=" absolute text-sm -top-4 -right-2 p-1">
              {cart?.cart?.totalQuantity > 99
                ? '99+'
                : cart?.cart?.totalQuantity}
            </div>
          )}
          <ShoppingCart className="text-lg" />
        </div>
        <i
          className={` fas fa-bars-staggered text-2xl hover:cursor-pointer `}
          onClick={() => setNav(!nav)}
        ></i>
      </div>

      <SideBarMenu nav={nav} closeFn={setNav} list={navList} />
    </nav>
  );
}

export const SideBarMenu: React.FC<SideBarMenuProps> = ({
  nav,
  closeFn,
  list,
}) => {
  const [searchInput, setInput] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (window)
      window.addEventListener(
        'resize',
        () => window.innerWidth >= 1000 && closeFn(false),
      );
    return () => {
      if (window)
        window.removeEventListener(
          'resize',
          () => window.innerWidth >= 1000 && closeFn(false),
        );
    };
  }, []);

  // for search
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  function onSubmit(search: string) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (window) localStorage.setItem('search', search);
    router.push('/products/search');
    closeFn(false);
  }

  return (
    <>
      {nav && (
        <>
          <div className="absolute  w-full flex flex-col gap-4 bg-secondary p-4 xsm:px-6  xsm:py-5 md:py-4 z-50">
            <div className="flex mt-12 w-full justify-between items-center ">
              <div className="w-[80%]">
                <Link
                  href="/"
                  className="w-full items-center  "
                  onClick={() => closeFn(false)}
                >
                  <Image src={LogoImage} alt="/" width={80} height={80} />
                </Link>
              </div>

              <i
                onClick={() => closeFn(false)}
                className="fas fa-xmark text-3xl  text-center hover:cursor-pointer  "
              ></i>
            </div>

            {/* search input */}
            <div>
              <Form {...form}>
                <div className="flex justify-between">
                  <Input
                    className="rounded-none focus-visible:ring-0  border-0 border-transparent  h-10  w-full"
                    type="text"
                    placeholder="Search"
                    autoFocus={true}
                    // {...field}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="text-center rounded-none bg-primary h-10 "
                    onClick={() => {
                      onSubmit(searchInput);
                      closeFn(false);
                    }}
                  >
                    <SearchIcon className="text-secondary " />
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </>
      )}
      <ul
        className={`z-10  block font-poppins  transition-all ease-linear xl:hidden  overflow-y-scroll scroll-hide ${
          nav
            ? 'absolute top-0 left-0 duration-100 w-full h-screen bg-secondary flex flex-col justify-start items-center pt-40'
            : 'absolute top-40 left-[-100%] hidden duration-100'
        }`}
      >
        {list &&
          list.map((item: any, i: number) => {
            return (
              <Link
                href={`/products/${getRoutData(item?.url)}`}
                key={i}
                className={`group py-3 text-lg w-full text-center ${
                  list.length - 1 === i ? 'border-y-[1px]' : 'border-t-[1px]'
                }
             border-gray-200 hover:bg-primary captialize-first  lowercase hover:text-primary-foreground hover:border-transparent transition-colors duration-300 ease-in-out cursor-pointer`}
                onClick={() => {
                  closeFn(false);
                }}
              >
                {item.title}
              </Link>
            );
          })}
        <Link
          href={user?.is_login ? '/my-account' : '/login'}
          className={`group py-3 text-lg w-full text-center border-y-[1px] 
          border-gray-200 hover:bg-primary  hover:text-primary-foreground hover:border-transparent transition-colors duration-300 ease-in-out cursor-pointer`}
          onClick={() => {
            closeFn(false);
          }}
        >
          {user?.is_login ? 'My Account' : 'Login'}
        </Link>
      </ul>
    </>
  );
};
