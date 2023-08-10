/* eslint-env node */

/** @type {import('prettier').Config} */
module.exports = {
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/config/(.*)$",
    "^~/lib/(.*)$",
    "^~/hooks/(.*)$",
    "^~/api/(.*)$",
    "^~/components/ui/(.*)$",
    "^~/components/(.*)$",
    "^~/(.*)$",
    "",
    "^[./]",
    "",
    ".css$",
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
