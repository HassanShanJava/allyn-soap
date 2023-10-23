import { Connection } from "~/server/lib/shopify/type";

export const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge: any) => edge?.node);
};

export const bannerData = (array: Connection<any>) => {
  const data=array.edges.map((edge: any) => edge?.node);
  let payload=[]
  // data.map((item,i)=>)
}