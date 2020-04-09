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
			orange: '#FF9800'
		},
		extend: {
			fontSize: {
				'7xl': '6rem',
				'8xl': '7rem',
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
