/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        xs: '500px',
        sm: '639px',
        md: '769px',
        lg: '1025px',
        'xl-lg': '1100px',
        xl: '1350px',
        '2xl': '1535px',
      },
    },

    extend: {
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },

      transitionDuration: {
        0: '0ms',
        2000: '2000ms',
      },
      colors: {
        border: {
          DEFAULT: 'hsl(var(--border))',
          light: 'hsl(var(--border-light))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        imageBackground: 'hsl(var(--imageBackground))',
        name: 'hsl(var(--name))',
        seperator: 'hsl(var(--seperator))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
          muted: 'hsl(var(--dot-color))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'hsl(var(--text-dark))',
          light: 'hsl(var(--text-light))',
          white: 'hsl(var(--text-white))',
          'light-secondary': 'hsl(var(--text-light-secondary))',
          'light-gray': 'hsl(var(--text-light-gray))',
          gray: 'hsl(var(--text-light-lightGray))',
          'dark-gray': 'hsl(var(--text-gray))',
          green: 'hsl(var(--text-light-green))',
          blue: 'hsl(var(--text-light-blue))',
          yellow: 'hsl(var(--text-light-yellow))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      screens: {
        xs: '340px',
        smm: '400px',
        xsm: '480px',
        sm: '640px',

        // => @media (min-width: 640px) { ... }

        md: '768px',
        mdxs: '800px',
        // => @media (min-width: 768px) { ... }
        mdx: '992px',
        slg: '1000px',
        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        'xl-lg': '1100px',
        'nav-list': '1150px',

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
  ]
};
