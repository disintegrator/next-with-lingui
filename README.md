<!-- [![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/zeit/next.js/tree/master/examples/with-lingui) -->

# Example app with LinguiJS

<!-- ## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example with-lingui with-lingui-app
# or
yarn create next-app --example with-lingui with-lingui-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-lingui
cd with-lingui
``` -->

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```

## The idea behind the example

This project demonstrates how to integrate LinguiJS with Next.js. There are some key pieces that make this integration possible:

- During server rendering, lingui has access to all the language catalogs because there is no transfer cost
- On the client, only the catalog for the detected language is loaded into `window.LINGUI_CATALOG`. This is configured in `.linguirc` and `locale/catalogs.client.js`
- Importing catalogs isomorphically is done using a module alias called `@catalogs` as in `import getCatalog from "@catalogs"`. As mentioned in the previous two points, this alias resolves to different modules for server (`locale/catalogs.server.js`) and client (`locale/catalogs.client.js`).
- In order to change the language, there needs to be hard browser refresh since the active catalog is inserted into the `<head />` of the document (see `pages/_document.js`) during server-side rendering. You cannot use `<Link />` or `pushState`/`replaceState`.
  - This is a sensible setup that avoids downloading unused language catalogs on the client
- The active catalog is loaded into lingui's I18nProvider in `pages/_app.js`

## Workflow

- Add translations to your React code
- Run `npm run lingui:extract` or `yarn lingui:extract`
- Run `npm run lingui:compile` or `yarn lingui:compile`
- Restart your development server (this can be improved by watching the locale folder but it's out of scope in this demo)
