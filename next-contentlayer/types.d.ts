type Page = {
  _id: string
  // utility type
  /* 
  object
  keys: type K
  values: type V

  {string: any}
  */
  _raw?: Record<string, any> | undefined
  type: 'Page'
  title: string
  description?: string | undefined
  date: string
  body: MDX | undefined
  slug: string
  slugAsParams: string
}