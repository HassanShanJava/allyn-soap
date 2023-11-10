import { Connection } from '~/server/lib/shopify/type';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { truncate } from 'fs/promises';

export const removeEdgesAndNodes = (array: Connection<any>) => {
  return array?.edges?.map((edge: any) => edge?.node);
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

export const validateEmail = (email: string): boolean => {
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    // Ensure there's exactly one "@" symbol in the email address
    return false;
  }

  const domain = emailParts[1];
  const domainParts = domain?.split('.');
  if (
    domainParts &&
    ['google', 'yahoo', 'outlook'].find((item) => domainParts.includes(item))
  ) {
    // Ensure there's at least one subdomain and a top-level domain
    return false;
  }

  if (domainParts && domainParts.length < 2) {
    // Ensure there's at least one subdomain and a top-level domain
    return false;
  }

  // Check for duplicates in the domainParts array
  const uniqueDomainParts = new Set(domainParts);
  if (domainParts && uniqueDomainParts.size !== domainParts.length) {
    // If there are duplicates, return false
    return false;
  }

  return true;
};
export const validateRegixEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  return regex.test(email);
};


// compress image

export async function compressImage(fileImage: File, fileType = 'image/webp') {
  const bitmap = await createImageBitmap(fileImage);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  ctx?.drawImage(bitmap, 0, 0);
  // Convert canvas content to a new Blob with reduced quality
  const reducedBlob: Blob = await new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob), fileType, 0.5);
  });

  // Create a new File object from the reduced Blob
  const reducedFile = new File([reducedBlob], fileImage.name, {
    type: fileType, // Adjust the type if needed
    lastModified: fileImage.lastModified,
  });

  return reducedFile;
}