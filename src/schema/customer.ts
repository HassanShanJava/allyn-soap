import { z } from 'zod';
import { validateEmail } from '~/utils/helper';

export const signupCustomerSchema = z.object({
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
  email: z
    .string({
      required_error: 'Please enter your email',
      invalid_type_error: 'Please enter your email',
    })
    .email({
      message: 'Please use a valid email ',
    })
    .refine((val) => (val.includes('*') ? false : true), {
      message: 'Please use a valid email ',
    })
    .refine((val) => validateEmail(val), {
      message: 'Invalid email format.',
    }),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(30, {
      message: 'Password must not exceed 30 characters',
    })
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one digit')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .refine((val) => (val.includes(' ') ? false : true), {
      message: 'Please enter your password',
    }),
});

export const loginCustomerSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter your email',
      invalid_type_error: 'Please enter your email',
    })
    .email({
      message: 'Please use a valid email ',
    })
    .refine((val) => (val.includes('*') ? false : true), {
      message: 'Please use a valid email ',
    })
    .refine((val) => validateEmail(val), {
      message: 'Invalid email format.',
    }),
  password: z
    .string({ required_error: 'Please enter your password' })
    .min(6, {
      message: 'Password must be at least 6 characters',
    })
    .max(30, {
      message: 'Password must not exceed 30 characters',
    })
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one digit')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    )
    .trim(),
});
