

import apolloClient from '../../../apollo-client';

import { gql } from '@apollo/client';
import { removeEdgesAndNodes } from 'lib/shopify';
import CategorySlider from '../common/sliders/category-slider';

export const GET_PRODUCTS = gql`
    query getCollections {
  collections(first: 199) {
    edges {
      node {
        handle
        description
        title
        products(first: 10) {
          filters {
            values {
              count
              
            }
          }
        }
        image {
          id
          src
          url
          altText
        }
      }
    }
  }
}`

const CategorySection = async() => {

// const collection = await getCollections()
const {data,} = await apolloClient.query({
    query: GET_PRODUCTS,
    
});
  // const { loading, error, data:collection } = useQuery(GET_PRODUCTS, { client:apolloClient });
const collection  =  removeEdgesAndNodes(data?.collections)
  return (
    <section id="category">
    <div className="">
      <div className="flex items-center justify-center">
        <div className="w-full px-4 py-12 2xl:container sm:px-6 xl:px-20 2xl:mx-auto 2xl:px-0">
          <div className="jusitfy-center flex flex-col items-center">
            <div className="mb-2 flex flex-col items-center justify-center gap-2">
              <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl  text-text font-extrabold  text-grayColor">SHOP BY CATEGORIES</p>
              <p className="text-xs sm:text-sm md:text-sm text-text-light w-full sm:w-4/6 text-center ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
            </div>
            <div className=" w-full  md:gap-x-2 mx-auto  ">
                <CategorySlider  collection={collection}/>
            </div>
          </div>
         
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
