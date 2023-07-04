/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['src/routes/**/*.{svelte,js,ts,html}', 'src/components/**/*.{svelte,js,ts,html}'],
	daisyui: {
		themes: [
			{
				myTheme: {
					primary: 'hsl(var(--p) / <alpha-value>)',
					secondary: 'hsl(var(--s) / <alpha-value>)',
					accent: 'hsl(var(--a) / <alpha-value>)',
					neutral: 'hsl(var(--n) / <alpha-value>)',
					info: 'hsl(var(--in) / <alpha-value>)',
					success: 'hsl(var(--suc) / <alpha-value>)',
					warning: 'hsl(var(--wa) / <alpha-value>)',
					error: 'hsl(var(--er) / <alpha-value>)',
					'base-100': 'hsl(var(--b1) / <alpha-value>)',
				},
			},
		],
	},
	theme: {
		extend: {
			colors: {
				bkg: 'hsl(var(--bkg) / <alpha-value>)',
				content: 'hsl(var(--content) / <alpha-value>)',
			},
			width: {
				scrollbarWidth: 'var(--scrollbarWidth)',
				layoutWidth: 'calc(100vw - var(--scrollbarWidth))',
				sidebar: 'var(--sidebar)',
			},
			height: {
				nav: 'var(--navHeight)',
				layoutHeight: 'calc(100vh - var(--navHeight))',
			},
			padding: {
				nav: 'var(--navHeight)',
			},
			margin: {
				nav: 'var(--navHeight)',
			},
			scrollPadding: {
				nav: 'var(--navHeight)',
			},
		},
		fontFamily: {
			sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
			serif: [...defaultTheme.fontFamily.serif],
			mono: [...defaultTheme.fontFamily.mono],
		},
		fontSize: {
			xs: 'clamp(0.64rem, calc(0.67rem + -0.04vw), 0.66rem)',
			sm: 'clamp(0.76rem, calc(0.74rem + 0.07vw), 0.80rem)',
			base: ' clamp(0.88rem, calc(0.82rem + 0.22vw), 1.00rem)',
			lg: ' clamp(1.01rem, calc(0.91rem + 0.43vw), 1.25rem)',
			xl: 'clamp(1.16rem, calc(0.99rem + 0.72vw), 1.56rem)',
			'2xl': 'clamp(1.33rem, calc(1.07rem + 1.10vw), 1.95rem)',
			'3xl': 'clamp(1.53rem, calc(1.15rem + 1.61vw), 2.44rem)',
			'4xl': 'clamp(1.76rem, calc(1.22rem + 2.28vw), 3.05rem)',
			'5xl': 'clamp(2.02rem, calc(1.28rem + 3.17vw), 3.82rem)',
		},
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/aspect-ratio'),
		require('tailwindcss-brand-colors'),
		require('tailwindcss-debug-screens'),

		plugin(({ addUtilities, addComponents, addBase, addVariant, matchVariant, theme }) => {
			addUtilities({
				'.word-spacing': {
					'word-spacing': '0.5rem',
				},
				'.dvh-screen': {
					height: ['100vh', '100dvh'],
				},
				'.blue-dot': {
					width: '8px',
					height: '8px',
					margin: '8px',
					border: '2px solid rgb(102, 153, 204)',
					'background-color': 'rgb(102, 153, 204)',
					'min-width': '8px',
					'border-radius': '50%',
				},
				'.gray-dot': {
					width: '8px',
					height: '8px',
					margin: '8px',
					border: '2px solid #A5A5A5',
					'background-color': '#A5A5A5',
					'min-width': '8px',
					'border-radius': '50%',
				},
				'.bg-stripes-gray': {
					'background-color': '#9ca3af1a',
					'background-image':
						'linear-gradient(135deg, #6b728080 10%, transparent 0, transparent 50%, #6b728080 0, #6b728080 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-cyan': {
					'background-color': '#22d3ee1a',
					'background-image':
						'linear-gradient(135deg, #06b6d480 10%, transparent 0, transparent 50%, #06b6d480 0, #06b6d480 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-sky': {
					'background-color': '#38bdf81a',
					'background-image':
						'linear-gradient(135deg, #0ea5e980 10%, transparent 0, transparent 50%, #0ea5e980 0, #0ea5e980 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-blue': {
					'background-color': '#60a5fa1a',
					'background-image':
						'linear-gradient(135deg,#3b82f680 10%,transparent 0,transparent 50%,#3b82f680 0, #3b82f680 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-indigo': {
					'background-color': '#818cf81a',
					'background-image':
						'linear-gradient(135deg, #6366f180 10%, transparent 0, transparent 50%, #6366f180 0, #6366f180 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-violet': {
					'background-color': '#a78bfa1a',
					'background-image':
						'linear-gradient(135deg, #8b5cf680 10%, transparent 0, transparent 50%, #8b5cf680 0, #8b5cf680 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-purple': {
					'background-color': '#c084fc1a',
					'background-image':
						'linear-gradient(135deg, #a855f780 10%, transparent 0, transparent 50%, #a855f780 0, #a855f780 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-fuchsia': {
					'background-color': '#e879f91a',
					'background-image':
						'linear-gradient(135deg, #d946ef80 10%, transparent 0, transparent 50%, #d946ef80 0, #d946ef80 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-pink': {
					'background-color': '#f472b61a',
					'background-image':
						'linear-gradient(135deg, #ec489980 10%, transparent 0, transparent 50%, #ec489980 0, #ec489980 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
				'.bg-stripes-white': {
					'background-image':
						'linear-gradient(135deg, hsla(0, 0%, 100%, 0.75) 10%, transparent 0, transparent 50%,hsla(0, 0%, 100%, 0.75) 0, hsla(0, 0%, 100%, 0.75) 60%, transparent 0, transparent)',
					'background-size': '7.07px 7.07px',
				},
			});

			addComponents({
				'.stacked': {
					display: 'grid',
					isolation: 'isolate',
					'place-items': 'center',
				},

				'.stacked > *': {
					'grid-column': '1 / 2',
					'grid-row': '1 / 2',
				},
			});

			addBase({
				h1: { fontSize: theme('fontSize.5xl'), fontWeight: theme('fontWeight.bold') },
				h2: { fontSize: theme('fontSize.4xl'), fontWeight: theme('fontWeight.semibold') },
				h3: { fontSize: theme('fontSize.3xl'), fontWeight: theme('fontWeight.semibold') },
				h4: { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.semibold') },
				h5: { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.semibold') },
				h6: { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.semibold') },
			});
		}),
	],
};
