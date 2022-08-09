/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,njk,md}", ".eleventy.js"],
	theme: {
		colors: {
			// Reasonable Colors https://reasonable.work/colors/
			primary: {
				light: "var(--color-rose-1)",
				DEFAULT: "var(--color-rose-3)",
				dark: "var(--color-rose-5)",
			},
			accent: {
				1: "var(--color-blue-1)",
				2: "var(--color-blue-3)",
			},
			neutral: {
				100: "var(--color-gray-1)",
				200: "var(--color-gray-2)",
				300: "var(--color-gray-3)",
				400: "var(--color-gray-4)",
				500: "var(--color-gray-5)",
				600: "var(--color-gray-6)",
			},
			white: "rgb(255, 255, 255)",
		},
		fontFamily: {
			header: ["IBM Plex Sans", "sans-serif"],
			body: ["IBM Plex Sans", "sans-serif"],
			emphasis: ["IBM Plex Sans", "sans-serif"],
		},
		extend: {
			// Utopia Fluid Type Size
			fontSize: {
				"fluid-size-xs": "var(--step--2)",
				"fluid-size-sm": "var(--step--1)",
				"fluid-size-base": "var(--step-0)",
				"fluid-size-lg": "var(--step-1)",
				"fluid-size-xl": "var(--step-2)",
				"fluid-size-2xl": "var(--step-3)",
				"fluid-size-3xl": "var(--step-4)",
				"fluid-size-4xl": "var(--step-5)",
				"fluid-size-5xl": "var(--step-6)",
				"fluid-size-6xl": "var(--step-7)",
			},
			// Utopia Fluid Scaling
			spacing: {
				"fluid-space-3xs": "var(--space-3xs)",
				"fluid-space-2xs": "var(--space-2xs)",
				"fluid-space-xs": "var(--space-xs)",
				"fluid-space-base": "var(--space-s)",
				"fluid-space-m": "var(--space-m)",
				"fluid-space-l": "var(--space-l)",
				"fluid-space-xl": "var(--space-xl)",
				"fluid-space-2xl": "var(--space-2xl)",
				"fluid-space-3xl": "var(--space-3xl)",
			},
			maxWidth: {
				"70ch": "70ch",
			},
		},
	},
	plugins: [],
};
