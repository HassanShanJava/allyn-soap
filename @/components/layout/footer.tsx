import { getMenu } from "lib/shopify";

export default async function Foter() {
  const menu = await getMenu('footer');

  return (
    <main className='bg-black  pt-5 mt-5 '>
    <section className='mt-4 text-center py-2 bg-sub text-[#ffffff] cursor-pointer'>
      <p>© 2023 Panaverse. All rights reserved</p>
    </section>

  </main>
  )
}