// noinspection SpellCheckingInspection

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import svelteParser from "svelte-eslint-parser";

export default [
  {
    ignores: ["node_modules", ".svelte-kit", "build", "dist"]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser, // allow <script lang="ts">
        ecmaVersion: "latest",
        sourceType: "module"
      }
    }
  },
  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "arrow-parens": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "no-undef": "off",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "svelte/no-navigation-without-resolve": "off"
    }
  }
];
