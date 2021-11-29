// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "hooks"],
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": 0,
    "linebreak-style": ["error", "unix"],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
}
