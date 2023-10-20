import { Connection } from "~/server/lib/shopify/type";

export const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge:any) => edge?.node);
};