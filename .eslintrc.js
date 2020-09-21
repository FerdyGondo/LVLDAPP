module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    ecmaVersion: 6,
    sourceType: "module",
    jsx: true,
    ecmaFeatures: {
      jsx: true,
      restParams: true,
      spread: true,
      experimentalObjectRestSpread: true,
      modules: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "plugin:prettier/recommended",
    "prettier/react",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["babel", "react", "prettier", "react-native-globals"],
  env: {
    "react-native-globals/all": true
  },
  globals: {
    fetch: true,
    __DEV__: true
  },
  rules: {
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-member-accessibility": ["warn", { accessibility: "no-public" }],
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "react/prop-types": ["off"],
    "react/no-unescaped-entities": ["off"],
    "react/display-name": ["warn"]
  }
};
