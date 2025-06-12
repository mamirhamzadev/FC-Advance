/* eslint-env node */

module.exports = {
	env: { browser: true, es2020: true },
	extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"react/prop-types": "off",
		// "max-len": ["error", { code: 150 }],
		indent: ["error", "tab", { SwitchCase: 1, ignoredNodes: ["ConditionalExpression"] }],
		"no-tabs": 0,
		semi: ["error", "always"],
		quotes: ["error", "double"],
		camelcase: ["error", { properties: "always" }],
	},
	globals: {
		__dirname: "readonly",
	},
};
