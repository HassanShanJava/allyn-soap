import { Connection } from '~/server/lib/shopify/type';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';

export const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge: any) => edge?.node);
};
export const getRoutData = (url: string) => {
  const data = url?.split('/');
  return data[data?.length - 1];
  // data.map((item,i)=>)
};
export const bannerData = (array: Connection<any>) => {
  const data = array.edges.map((edge: any) => edge?.node);
  // data.map((item,i)=>)
};

export const loginToken = async (props: {
  accessToken: string;
  expiresAt: string;
}) => {
  const date1: any = new Date();
  const date2: any = new Date(props?.expiresAt);

  // Calculate the time difference in milliseconds
  const timeDifference = date2 - date1;

  // Convert the time difference to seconds, minutes, and hours
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);

  // Calculate the maxAge in seconds
  const maxAgeSeconds = secondsDifference;

  // Calculate the maxAge in minutes
  const maxAgeMinutes = minutesDifference;

  // Calculate the maxAge in hours
  const maxAgeHours = hoursDifference;
  const maxAgeSecond = maxAgeHours * 60 * 60;
  console.log('maxAge:', maxAgeHours * 60 * 60, 'seconds');
  console.log('maxAge:', maxAgeMinutes, 'minutes');
  console.log('maxAge:', maxAgeHours, 'hours');
  setCookie('allynssoapco_token', props?.accessToken, {
    maxAge: maxAgeSecond * maxAgeMinutes * maxAgeHours,
  });
  return true;
};
