# next-contentlayer-blog
project study of [next-contentlayer](https://vercel.com/templates/next.js/nextjs-contentlayer) on VERCEL/templates

## links & resources
- [github/next-contentlayer](https://github.com/shadcn/next-contentlayer/tree/main)
- [demo](https://next-contentlayer.vercel.app/)


## notes
starting understanding with `contentlayer.config.js`

`@contentlayer/source-files` [API reference](https://www.contentlayer.dev/docs/reference/source-files-f4638f76)


something I learnt

```js
// case 1
<MdxComponent>
  <RandomComponent />
</MdxComponent>

// case 2
<MdxComponent component={RandomComponent} />
```

difference between case 1 and 2 is that
### case 1
`<RandomComponent>` is passed as a child component to `<MdxComponent>` and is **rendered**.

### case 2
`<RandomComponent>` is passed as a prop directly to the `<MdxComponent>` component.

> example passes the component as a child, while the second example passes the component as a prop named components
>
case 1 (rendered as a child)


`withContentlayer()` in `next.config.js` is how contentlayer hooks into `next build` and `next dev`


depending on the name in `defineDocumentType` 
if name = "Page" then an `allPages` object is created 


Important config files
1. next.config.js
2. contentlayer.config.ts
3. tsconfig.json


already run into my first issue

[Next config file uses ESM (import / export)](https://github.com/contentlayerdev/contentlayer/issues/505)

fix applied rename `next.config.js` to `next.config.cjs`

we have error on contentlayer version to ^0.3.1

don't do the below, but that's how you have a certain version
```sh
npx create-next-app@13.4.1 next-app && cd next-app && npm i next@13.4.1
```

```sh
npm i contentlayer@0.3.1 next-contentlayer@0.3.1
```
test 1 -> it needed `pnpm`

yeah it just needed `pnpm` on a global install, somewhere inside.

anyways, I have to restart my project

added prettier and prettier-plugin-tailwindcss