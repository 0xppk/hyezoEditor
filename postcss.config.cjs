const postcssGlobalData = require('@csstools/postcss-global-data');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const tailwindcssNesting = require('tailwindcss/nesting');
const postcssNesting = require('postcss-nesting');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	plugins: [
		postcssGlobalData({
			files: ['./src/lib/styles/custom-media-queries.css'],
		}),
		postcssPresetEnv({
			stage: 3,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
				'media-query-ranges': true,
			},
		}),
		tailwindcssNesting(postcssNesting),
		tailwindcss,
		autoprefixer,
		csso,
	],
};
