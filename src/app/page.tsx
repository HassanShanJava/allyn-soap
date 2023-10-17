import { getCollectionProducts } from "lib/shopify";

export default async function HomePage() {
   const products = await getCollectionProducts({ collection: 'dryer-balls-and-spray' });
console.log({products})
  // if (!products?.length) return null;
  return (
    <div>
      {/* <p className="text-7xl font-black">Sup!</p> */}
    </div>
  );
}
