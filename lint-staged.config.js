module.exports = {
  "*.{ts,tsx,css}": ["prettier . --write"],
  "*.{ts,tsx}": [
    "eslint . --cache --fix",
    () => "yarn tsc",
    () => "yarn vitest run",
  ],
};
