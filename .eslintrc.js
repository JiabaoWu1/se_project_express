module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  // Add the necessary extensions.
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["error", "always"], // Enforce semicolons
    quotes: ["error", "double"], // Enforce double quotes
    "no-unused-vars": ["warn"], // Warn about unused variables
    indent: ["error", 2], // Enforce 2 spaces for indentation
    "no-console": "off", // Allow console statements
  },
};
