import { getMenu } from "lib/shopify";
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

export default async function Foter() {
  const menu = await getMenu('footer');

  return (
    <main className='bg-black  pt-5 mt-5 '>

    <section className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:flex justify-evenly mt-10 p-5 gap-10 mx-auto'>

      <div className="text-[#ffffff] cursor-pointer">
        <h2 className='text-2xl font-bold'>Shoetopia</h2>
        <p className='mt-5 lg:w-56 w-auto mr-3 text-gray'>Find your perfect pair of shoes for any occasion.</p>
      </div>

      <div className="text-gray cursor-pointer">
        <h3 className='font-semibold text-xl mb-3 text-[#ffffff]'>Product</h3>
        <p>Medical shoes</p>
        <p>Sneakers</p>
        <p>Boots</p>
      </div>

      <div className="text-gray cursor-pointer">
        <h3 className='font-semibold text-xl mb-3 text-[#ffffff]'>Support</h3>
        <p>Support Carrier</p>
        <p>24th Service</p>
        <p>Quick Chat</p>
      </div>

      <div className="text-gray cursor-pointer">
        <h3 className='font-semibold text-xl mb-3 text-[#ffffff]'>Company</h3>
        <p>Abouts</p>
        <p>Terms and Conditions</p>
        <p>Privacy Policy</p>
      </div>


    </section>

    <div className='flex gap-1 items-center lg:mx-32  mt-5 text-gray cursor-pointer mx-auto'>
      <ul className="flex gap-1">
        <li><BsFacebook size={18} /></li>
        <li><AiFillTwitterCircle size={20} /></li>
        <li><AiFillInstagram size={20} /></li>
      </ul>
      <p className="">/Shoetopia</p>
    </div>

    <section className='mt-4 text-center py-2 bg-sub text-[#ffffff] cursor-pointer'>
      <p>© 2023 Panaverse. All rights reserved</p>
    </section>

  </main>
  )
}