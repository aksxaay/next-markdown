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

### About Page

we received the slug

dynamically generate the metadata
```js

```

we're using `getPageParams` to retrieve `page` from `allPages`


if `page` is found
then => we display an article
- title
- description
- body.code?

I still don't understand Error Boundary that next talks about.

```js
export type Page = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Page'
  title: string
  description?: string | undefined
  /** MDX file body */
  body: MDX
  slug: string
  slugAsParams: string
}
```

from here, MDX has 
- raw
- code (what we're using)

this code we're feeding into `components/mdx-components`

which internally has a `useMDXComponent` function from `next-contentlayer/hooks`

revisit `mdx-bundler`

basically we're getting returned `Component: useComponent()` and passed as props
```js

```

I'm abstracting this mdx parsing logic away by calling it `MDXComponentRenderer`/`MdxComponentInterface`

main point is, you can override the default behaviors by using [Custom MDX Components](https://www.contentlayer.dev/docs/sources/files/mdx-d747e46d#custom-mdx-components)

interface vs type

rn it's still SSR (Server)
```sh
λ /[...slug]
λ /posts/[slug]
```

you can't export getPageParams, it wouldn't build for some reason

to convert this to SSG, going to do some rehauls

I need to export an array of paths or something.

I forgot this thing ran server side and you can't debug like that.

the `use client` shit is fucking real. After about a day I'm already getting used to this shit.

okay after my certain changes

```sh
○ /                                      
├ ● /[slug]                              
├ ○ /favicon.ico                         
└ λ /posts/[slug]
```

`[slug]` route is purely SSG


I was able to replicate the same thing for
`posts/[slug]` route as well,

but images don't render tbh

`posts/[slug]` is purely SSG

okay now that I've done all these things,

checking back on the original website,
they have
- prettier headings
- highlighting
- other things I can't event describe
- markdown looks like markdown

there's an extra `typography` plugin from tailwind?

> provides set of `prose` classes that you can add typographic fonts to
>

```sh
pnpm install -D @tailwindcss/typography
```

the `@tailwindcss/typography` plugin literally auto styles everything, super easy

and also prettier classes sorting for tailwind, while using `pnpm` it doesn't work

tailwind issue with `prettier@3.0.0`

but fixed after 

```sh
npm install -D prettier@2.8 prettier-plugin-tailwindcss
```


### remark and rehype plugins support

[MDX Plugins (remark/rehype)](https://www.contentlayer.dev/docs/sources/files/mdx-d747e46d#mdx-plugins-remarkrehype)

doesn't work as mentioned in contentlayer docs

rehype plugins
- rehype-autolink-headings
- rehype-pretty-code
- rehype-slug
- remark-gfm

unist-util-visit?

fixing `rehypeAutolinkHeadings` seemed to work
this entire part was taken from my `mdx-blog`

[rehype website](https://rehype-pretty-code.netlify.app/) - explains everything

to change theme just change [this line](../next-contentlayer/lib/rehypePrettyCode.ts#L105)

ran `npm run preview` no issues


I think I can figure out how eventually understand all this prettification code, I need to understand how to manage the content fr. that it works on a 
- pull basis
- fix all the image links?
- dynamic tags #next and things


the idea is to have ISR and then upgrade it to **on-demand ISR** which seems to be the best solution for now. Later experiment with **github hooks**

- Background Revalidation
- On-demand

```js
export const revalidate = 60;
```

this not the only thing
+ can't understand it from the docs either.
+ revalidate doesn't work on dev mode.


revalidate doesn't work because i'm not able to trigger contentlayer dev generation or something.