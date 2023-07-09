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
pnpm i contentlayer@0.3.2 next-contentlayer@0.3.2
```
test 1 -> it needed `pnpm`

yeah it just needed `pnpm` on a global install, somewhere inside.

anyways, I have to restart my project

added prettier and prettier-plugin-tailwindcss

tailwind works, but contentlayer doesn't generate
issue in 0.3.1 so now upgraded to 0.3.2 but it prolly doesn't work then

install on `pnpm` makes `contentlayer dev` work

this is what makes it work
```sh
pnpm i contentlayer@0.3.2 next-contentlayer@0.3.2
```

> hard reset to next at "final final base starter project"

```js
const MyComponent = ({ params: { slug } }: Props)
```

this is how you destructure right there.

html tags
main - main content of a document
header - idk have nav components

to catch `/about` we're using a *catch-all segment*

remember that the props that we catch since it is catch-all segment
```js
type Props = {
  params: {
    slug: string[],
  }
}
```

if we run build?
output
as expected all of the are
```sh
λ  (Server)  server-side renders
```

