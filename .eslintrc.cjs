module.exports = {
  root: true,
  env:  { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.3" } },
  rules: {
    "react/prop-types": "off",           // JSDoc used instead of PropTypes
    "no-unused-vars":   ["warn", { argsIgnorePattern: "^_" }],
  },
};
