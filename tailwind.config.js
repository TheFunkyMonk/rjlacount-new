module.exports = {
	theme: {
		fontFamily: {
			sans: [
				'Montserrat',
				'sans-serif',
			],
			serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
			mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
		},
		colors: {
			transparent: 'transparent',

			black: '#0E1317',
			white: '#ffffff',

			gray: {
				100: '#f7fafc',
				200: '#edf2f7',
				300: '#e2e8f0',
				400: '#cbd5e0',
				500: '#a0aec0',
				600: '#718096',
				700: '#4a5568',
				800: '#2d3748',
				900: '#1a202c',
			},

			blue: '#1565C0',
			sky: '#B2E5FC',
			orange: '#FF9800',
			purple: {
				400: '#9374DB',
				600: '#7D60D2',
				800: '#6141BF',
			},
			avatar: {
				'eyes-dark': '#5F4C3F',
				'eyes-light': '#6C5343',
				'glasses': '#000000',
				'earring-light': '#EBE0E0',
				'earring-dark': '#D2C6C6',
				'beard-light': '#343434',
				'beard-med': '#292929',
				'beard-dark': '#1E1E1E',
				'skin-light': '#FFDDCF',
				'skin-base': '#FFD5C3',
				'skin-med': '#FFCDA4',
				'skin-dark': '#ECB58F',
				'skin-darker': '#DDA985',
				'shirt-light': '#191919',
				'shirt-dark': '#0E0E0E',
				'jeans-dark': '#022747',
				'jeans-light': '#063F76',
				'shadow': '#6141BF',
			}
		},
		extend: {
			fontSize: {
				'7xl': '6rem',
				'8xl': '7rem',
			},
			spacing: {
				'72': '20rem',
			},
		},
	},
	variants: {
		backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
		boxShadow: ['responsive', 'hover', 'focus', 'group-hover'],
		textColor: ['responsive', 'hover', 'focus', 'group-hover', 'dark', 'dark-hover', 'dark-active'],
		translate: ['responsive', 'hover', 'focus', 'group-hover']
	},
	plugins: [
		require('tailwindcss-dark-mode')()
	],
}
