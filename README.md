# Sorting Hat 2.0

Reworked for a frontend interface, frontend/json configuration, and reproducible/auditable results

## Dev Setup

This repo uses webpack. The main entry file is index.html, and source js files are in /src.

The main frontend logic is handled in vue, while the sorting code is mostly custom

### For Development

Run `yarn install -D`

To get webpack to automatically detect changes and rebuild the scripts, run `webpack --watch --mode=development`.
`index.html` should now load the new script.

### When you're done:

Run `yarn build` (This will automatically be in production mode due to `webpack.config.js`)

Push to your repository

Make a PR against https://github.com/yyc/sorting-hat
