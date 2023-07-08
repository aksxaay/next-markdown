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