## Client Component

the whole point of this mini project is for understanding Client Components, by building a search component.

also
```js
import {useRouter} from "next/navigation"
```

for client components, it is necessary

created `/components/Search.tsx`
I remember Samir's technique of multi-handline the properties you don't have to set up the useState for each and every one of the form fields.

I have Samir's method to aggregate form event handlers in `/components/Form.tsx`

also I didn't understand why only one of these methods, require there to be a double data binding 
`value={search}`

for a few types, this `types.d.ts` is enough.

also the way this guy uses promises is kinda weird, never uses it directly.


```md
Route (app)                                Size     First Load JS
┌ ○ /                                      141 B          77.6 kB
├ λ /[search]                              175 B          83.5 kB
└ ○ /favicon.ico                           0 B                0 B
+ First Load JS shared by all              77.5 kB
  ├ chunks/698-7bf6b1f385f8dede.js         25.1 kB
  ├ chunks/bce60fc1-4e969013c44856a8.js    50.5 kB
  ├ chunks/main-app-fb2be09d21313a23.js    207 B
  └ chunks/webpack-f43f2e98f26ebaeb.js     1.67 kB

Route (pages)                              Size     First Load JS
─ ○ /404                                   181 B          75.5 kB
+ First Load JS shared by all              75.3 kB
  ├ chunks/framework-8883d1e9be70c3da.js   45 kB
  ├ chunks/main-403426eb860d23e4.js        28.4 kB
  ├ chunks/pages/_app-b75b9482ff6ea491.js  195 B
  └ chunks/webpack-f43f2e98f26ebaeb.js     1.67 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```

we can see that the `[search]` is SSR rendered, and if we exported a certain function it would be SSG