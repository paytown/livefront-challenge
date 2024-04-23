# Livefront Coding Exercise
### Payton Lower

TODO: Fill out info

## Project Requirements

- Using any publicly available API of your choosing (examples include Yelp, Flickr, New York Times, etc.) build a simple, single-page web app with at least two screens. One screen should show a list of items from that API while the second screen should show a detail view for those items. Use this as an opportunity to be creative and demonstrate your familiarity with frontend web technologies.
- Use React as the view layer.  Feel free to use additional tools or frameworks as you see fit, but avoid relying on fully-styled UI kits like MaterialUI or Blueprint.  
- Tests are required. They may take any form deemed appropriate for the app (such as Jest or Mocha tests) but should demonstrate a basic understanding of testing a single-page web app.
- Minimally, make sure the app functions smoothly on Chrome, Firefox and at least one mobile browser.
- Use of 3rd party libraries for common tasks (networking, etc.) is acceptable.
- The app must be placed in a public repo on a site like GitHub or Bitbucket.
- The app must be able to be pulled down from this repo and built without any additional configuration. For example, Livefront should not be responsible for getting its own API keys or access. If an API key and/or username/password is required you can send that to us separately (it does not need to be stored in the repository)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
