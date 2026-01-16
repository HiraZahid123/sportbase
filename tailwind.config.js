import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Figtree',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		colors: {
  			brand: {
  				blue: '#2563EB',
  				darkBlue: '#1D4ED8',
  				green: '#16A34A',
  				red: '#DC2626',
  				yellow: '#F59E0B',
  				gray: '#64748B',
  				lightGray: '#E5E7EB'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			DEFAULT: '0.375rem',
  			lg: 'var(--radius)',
  			xl: '0.75rem',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '0 4px 6px rgba(0,0,0,0.1)',
  			hover: '0 8px 15px rgba(0,0,0,0.15)',
  			inner: 'inset 0 2px 4px rgba(0,0,0,0.06)'
  		},
  		transitionProperty: {
  			height: 'height',
  			spacing: 'margin, padding',
  			colors: 'background-color, border-color, color, fill, stroke'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: 0
  				},
  				'100%': {
  					opacity: 1
  				}
  			}
  		},
  		animation: {
  			fadeIn: 'fadeIn 0.3s ease-in-out forwards'
  		}
  	}
  },
  plugins: [forms, typography, aspectRatio, lineClamp, require("tailwindcss-animate")],
};
