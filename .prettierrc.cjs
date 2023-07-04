module.exports = {
	semi: true,
	useTabs: true,
	tabWidth: 2,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	arrowParens: 'avoid',
	bracketSameLine: false,
	pluginSearchDirs: ['.'],
	plugins: [import('prettier-plugin-svelte'), import('prettier-plugin-tailwindcss')],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
