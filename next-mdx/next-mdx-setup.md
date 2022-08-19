### next-mdx

[video  source](https://www.youtube.com/watch?v=J_0SBJMxmcw&list=LL&index=39&t=2935s)

`npx create-next-app@latest -- typescript`

```sh
yarn add remark-gfm remark-math remark-frontmatter rehype-katex
```

dude shits tough.

I get these 2 unhandled errors, 
Althought I did get the mathjax working. Lemme try out other tables and such shit.

Tables sorta work
that demo file is still fucked beyond repair.

here's one of the issues
[text content does not match server-rendered HTML](https://stackoverflow.com/questions/66374123/warning-text-content-did-not-match-server-im-out-client-im-in-div)
and they have a couple solutions, not convincing, but at-least I can understand a little bit.

well the shiki package worked?

fuck it i'm too dumb this is not going to work.

delba's is too complicated she imports this thing inside `contentlayer.config.ts`

maybe I should console log from every config file to see the order of execution of every config file.

[leighhalliday - next-blog](https://github.com/leighhalliday/next-blog)

> Getting MDX up and running with Next.js has never been easier thanks to Contentlayer: a content toolkit that makes working with content in your Next.js app super easy.

i read this in build [static content site](https://www.youtube.com/watch?v=obJvzyHiQ9k)

[contentlayer.dev](https://www.contentlayer.dev/)

[tailblocks.cc](https://tailblocks.cc/)
this one has really cool cards and things tailwindcss libraries


### vanilla method

gonna try the vanilla method as tried by our fellow leighhalliday/next-blog

okay I've done a fresh install of
`yarn create next-app` didn't specify typescript but I think it does typescript by default.
takes 163 seconds.