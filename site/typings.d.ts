type Base = {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

interface Post extends Base {
  author: Author
  body: Block[]
  categories: Category[]
  mainImage: Image
  slug: Slug
  title: string
  intro: string
  description: string
}

interface Kunden extends Base {
  kommentar: string
  name: string
}

interface Author extends Base {
  intro: ReactNode
  bio: Block[]
  image: Image
  name: string
  slug: Slug
}

interface Image {
  _type: string
  _type: 'reference'
}

interface Slug {
  _type: 'slug'
  current: string
}

interface Block {
  _key: string
  _type: 'block'
  children: Span[]
  markDefs: any[]
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
}

interface Span {
  _key: string
  _type: 'span'
  marks: string[]
  text: string
}

interface Category extends Base {
  description: string
  title: string
}

interface MainImage {
  _type: 'image'
  asset: Reference
}

interface Title {
  _type: 'string'
  asset: string
}

interface Product extends Base {
  slice(arg0: number, arg1: number): unknown
  store: StoreTitle
  categories: Category[]
  slug: Slug
  title: string
  intro: string
  description: string
}

interface StoreTitle {
  id: Key | null | undefined
  slug: any
  previewImageUrl: string | StaticImport
  title: ReactNode
  descriptionHtml: ReactNode
  _type: 'string'
  asset: string
}
