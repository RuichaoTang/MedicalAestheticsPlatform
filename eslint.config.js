export default {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:import/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": ["warn"],
    "no-console": "off",
    strict: ["error", "global"],
  },
  settings: {
    node: {
      allowModules: ["express"],
    },
  },
};
