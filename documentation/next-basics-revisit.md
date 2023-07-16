## Next Markdown
currently on next version `13.4.9`
### React's Newer Features
- server and client components
> Instead of React rendering your whole application client-side (such as in the case of Single-Page Applications), React now gives you the flexibility to choose where to render your components based on their purpose.

By default all components are Server default, unless `"use client"` directive is defined.
- move **interactive logic** to the leaves.
- This keeps overall layout as a **Server Component**.

General Notes
- using the `app` directory, it would seem pages has been officially deprecated
- index has been replaced by `page.tsx`


### app routing conventions
[app routing conventions](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions)
- layout
- page
- loading
- not-found
- error
- global-error

all of these are pages, that have special function

Dynamic Routes
- `[folder]` dynamic route
- `[...folder]` catch-all
- `[[...folder]]` optional catch all


page.module.css - only applies to a particular page
```js
import styles from 'about.module.css';

// className={styles.main}
```

### SEO & Metadata

old certain stuff has been deprecated rn
`head` components replaced by **export of metadata** 
soon learn to generate dynamic metadata if we're generating


### Error Boundaries

like in `about/error.tsx` if you throw an error


### Data Fetching, Dynamic Routes & Metadata
13.2
- built in SEO support
- MDX for Server Components?
- Rust MDX parser
- Improved Error Overlay?


#### Data fetching fundamentals

next js has support for automatic deduping requests, within the same tree and things? so that's cool?

we're not using `useEffect` but rather a separate async function which I'm assuming is running server side but yeah.

also we're gonna use a file similar to `next-env.d.ts` - type definition file

`types.d.ts` - our custome file
when you do `types.d.ts` it is automatically configured over the entire project I'm assuming

I don't have to setup loading by myself, it's pretty helpful

`[userId]` - dynamic routes

How to fetch parallely - 
```js
const [user, userPosts] = await Promise.all([userData, userPostsData]);
```
basic promise resolving parallely


> Note: to incrementally show content to the users, we have to use suspense and streaming

```js
import {Suspense} from 'react';
```

Suspense has a fallback basically, until the promise in the child component is resolved 

next js prefetches the links before you've even clicked wth

#### Metadata
Static Metadata - export `metadata` object
Dynamic Metadata - export `generateMetadata()` in layout/page


**IMP**
so far these are all **server components**


### SSG, SSR, ISR
so far we've discussed that they're server components, but never if they're static, server-side, any other strategies?

only tells what kind of components in `next build` mode.

by default the user that we've built means nothing


Well I just realized that I want to convert it from a **pull-based system** to a **push-based system**. As I don't want it to keep checking if the data is stale every 60 seconds bruv makes no sense.


`getServerSideProps`, `getStaticProps` and `getInitialProps` are all deprecated?

these new conventions are all confusing asf.



There's this whole concept of `use client` and `use server` directives that React now understand.

`useState` `useEffect` and `useReducer` all only run on the clientSide

Apparently Server Components only work on Next.js rn, they haven't been brough to React.

The fireship video on Next 13 finally makes sense, it has been declared for the last 8 months or something, I'm just really late to it.

by default you get SSR and ISR possible now

also for some reason we only keep using `fetch()` I think we've replaced the need for third party fetching libraries


SSR -> SSG

tell next.js in advance by using the `getStaticParams()` better naming ngl.

Next js, can now de-duplicate data by default?

Now we have a new issue

### Non serializable props

> Non-serializable props - prop that cannot be transformed into a JSON-compatible format

occurs in passing props server -> client


### dave implementation (for SSR SSG ISR study)

doing this to study basically
- SSR
- SSG
- ISR

and understand regular mdx struggles.

understand `Post` type from contentlayer
```js
export type Page = {
  /** ID */
  _id: string
  _raw: Record<string, any>
  type: 'Page'
  title: string
  description?: string | undefined
  /** MDX file body */
  body: MDX
  slug: string
  slugAsParams: string
}
```

weird fix I had to employ because was getting a promise inside a map

when you hover over the links, they **auto load** which is crazy from next.


### mdx conversion

new `/mdx` route
have to set the component to "use-client"
called the new `mdxRs` feature

+ it is unformatted bruv

Read all the way through dawg.
[Configuring/MDX // next.js](https://nextjs.org/docs/app/building-your-application/configuring/mdx)

I also enabled this as a workspace, so that I can view the documentation folder in the same thing as well

trying to apply `remark` and `rehype` plugins and I have to convert `next.config.js` into an ES module format

```sh

```


to understand about [`@next/mdx`](https://github.com/vercel/next.js/tree/c56915842a41ce5cd1328b36dff44004352c9f15/packages/next-mdx)
it is called next.js packages, that come included?


These are [mdxjs.com/advanced/typescript](https://web.archive.org/web/20200718173926/https://mdxjs.com/advanced/typescript) docs

the docs are suggesting using `unified`


`remarkHtml` a shortcut for .use(remarkRehype).use(rehypeStringify).

```js
const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(await read('example.md'))
```

don't quite understand the order
order is 
remarkParse -> remarkGfm -> remarkRehype -> rehypeStringify

but yeah we're replacing the last 2 with `remarkHtml`

but if we're using any `rehype` we need to use it though


### remark + rehypePrettyCode example
```js
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // See Options section below.
      theme: "monokai",
    })
    .use(rehypeStringify)
    .process('`const numbers = [1, 2, 3]{:js}`');

  console.log(String(file));
}

main();
```

Output
```html
<p><span data-rehype-pretty-code-fragment=""><code data-language="js" data-theme="default" style="background-color: #272822"><span class="line"><span style="color: #66D9EF; font-style: italic">const</span><span style="color: #F8F8F2"> numbers </span><span style="color: #F92672">=</span><span style="color: #F8F8F2"> [</span><span style="color: #AE81FF">1</span><span style="color: #F8F8F2">, </span><span style="color: #AE81FF">2</span><span style="color: #F8F8F2">, </span><span style="color: #AE81FF">3</span><span style="color: #F8F8F2">]</span></span></code></span></p>
```

so it's working here, lemme follow the exact same format

employed a fix presented here with `oniguruma`

had to comment out the rehypePrettyCode, the fix doesn't work

feeling pretty defeated

Let's just check out _shuding's example

HOW THE FUCK did shuding create this [documentation template](https://github.com/shuding/nextra)
- any change is rendered instantly?
- and I DON"T SEE `contentlayer`??? BOY WHAT THE FUCK.

I got it to working using `compileMDX` but it doesn't seem to support custom components yet, so not sure what to quite do about it.

Going to do more work built-in support `mdx`

Anyways, I think I should be blog ready to post about this shit.

I just had to import the button for it to work in `/about` route.
**NOPE** doesn't work.

we're going to add syntax highlighting :D
`highlight.js`
`rehype-highlight`
`rehype-slug` - add `id` to headings
`rehype-autolink-headings` - add links to the `id`s back to themselves

oh for highlight js, it just auto highlights using css

Autolinking: `http://localhost:3000/about#information-we-collect`

yeah you don't need to import it, you need to pass it to the `components` property in `compileMDX`


- `[slug]` - uses `compileMDX`
- `posts/[slug]` - uses the dangerously set html, from matter I guess.