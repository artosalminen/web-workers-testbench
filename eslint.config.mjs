import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ),
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "comma-dangle": "off",
      "multiline-ternary": "off",
      "no-use-before-define": "off",
      "space-before-function-paren": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
