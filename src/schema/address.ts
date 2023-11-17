import { z } from 'zod';

export const CustomerAddressSchema = z.object({
  firstName: z
    .string({ required_error: 'Please enter your firstname' })
    .min(2, {
      message: 'firstname must be at least 2 characters',
    })
    .max(30, {
      message: 'firstname must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your firstname',
    }),
  lastName: z
    .string({ required_error: 'Please enter your lastname' })
    .min(2, {
      message: 'lastname must be at least 2 characters',
    })
    .max(30, {
      message: 'lastname must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your lastname',
    }),
  company: z
    .string({ required_error: 'Please enter your company' })
    .min(2, {
      message: 'company must be at least 2 characters',
    })
    .max(30, {
      message: 'company must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your company',
    }),
  address1: z
    .string({ required_error: 'Please enter your address1' })
    .min(2, {
      message: 'address1 must be at least 2 characters',
    })
    .max(30, {
      message: 'address1 must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your address1',
    }),
  address2: z
    .string({ required_error: 'Please enter your address2' })
    .min(2, {
      message: 'address2 must be at least 2 characters',
    })
    .max(30, {
      message: 'address2 must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your address2',
    }).optional(),
  city: z
    .string({ required_error: 'Please enter your city' })
    .min(2, {
      message: 'city must be at least 2 characters',
    })
    .max(30, {
      message: 'city must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your city',
    }),
  country: z
    .string({ required_error: 'Please enter your country' })
    .min(2, {
      message: 'country must be at least 2 characters',
    })
    .max(30, {
      message: 'country must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your country',
    }),
  province: z
    .string({ required_error: 'Please enter your province' })
    .min(2, {
      message: 'province must be at least 2 characters',
    })
    .max(30, {
      message: 'province must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your province',
    })
    .optional(),
  zip: z
    .string({ required_error: 'Please enter your zip' })
    .min(2, {
      message: 'zip must be at least 2 characters',
    })
    .max(30, {
      message: 'zip must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your zip',
    }),
  phone: z
    .string({ required_error: 'Please enter your phone' })
    .min(2, {
      message: 'phone must be at least 2 characters',
    })
    .max(30, {
      message: 'phone must not exceed 30 characters',
    })
    .refine((val) => (val.startsWith(' ') ? false : true), {
      message: 'Please enter your phone',
    }),
});
