const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
		  animation: {
			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
			jumpinfinite: 'jumpinfinite var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite '
		  },
		  keyframes: {
			ripple: {
			  '0%, 100%': {
				transform: 'translate(-50%, -50%) scale(1) '
			  },
			  '50%': {
				transform: 'translate(-50%, -50%) scale(0.9)'
			  }
			},
			jumpinfinite: {
			  '0%, 100%': {
				transform: 'translateY(5px)'
			  },
			  '50%': {
				transform: 'translateY(-5px)'
			  }
			}
		  },
		  colors: {
			interbrasGreen: {
			  50: '#f2fbf2',
			  100: '#e1f7e1',
			  200: '#c3efc5',
			  300: '#95e098',
			  400: '#5fc965',
			  500: '#36a53c',
			  600: '#2a8f2f',
			  700: '#247129',
			  800: '#215a25',
			  900: '#1d4a21',
			  950: '#0b280e'
			},
	
			interbrasGray: '#3F4545'
		  },
		  fontFamily: {
			interbras: ['Gilroy', 'apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
		  }
		}
	  },
	darkMode: "class",
	plugins: [heroui()],
}
