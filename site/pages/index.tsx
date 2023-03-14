import { groq } from 'next-sanity'
import { client } from '@lib/sanity.client'
import BlogList from '@components/blog/BlogList'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import Categories from '@components/categorie/categoryList'
import Link from 'next/link'
import Image from 'next/image'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise

  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}
const query = groq`
*[_type=='post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`

export const revalidate = 30

export default function Home({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [documents, setDocuments] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await client.fetch(query)
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <>
      <div className="px-4 ">
        <div className="my-6">
          <div className="h-[66vh] bg-[url('https://cdn.discordapp.com/attachments/1084536803157090514/1084563027917033522/Stage_Bledner.png')]  bg-no-repeat bg-cover bg-center bg-fixed rounded-3xl">
            <div className="flex flex-col items-center justify-center h-full gap-5">
              <h1 className="text-4xl font-bold text-center text-white">
                Hier findest du <br /> was du suchst
              </h1>
              <button className="flex items-center justify-center h-12 p-8 bg-orange-500 rounded-full">
                Zum Shop
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-2 py-4 md:grid-rows-1 md:grid-cols-6">
          {categories.map((categorie: any) => (
            <Link href={`/search/${categorie.slug}`} key={categorie.id}>
              <Image src={categorie.image} alt={''} width={32} height={32} />
              <div className="py-2 text-sm font-semibold lg:text-lg">
                {categorie.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="py-2 text-2xl font-semibold">Beliebteste Produkte</div>
        <div className="flex w-full gap-4 overflow-x-scroll md:grid md:overflow-hidden md:grid-cols-4 ">
          {products.slice(0, 4).map((product: any, i: number) => (
            <ProductCard
              className="flex-shrink-0 lg:w-full md:flex-1 "
              variant="simple"
              key={product.id}
              product={product}
              imgProps={{
                alt: product.name,
                width: i === 0 ? 1080 : 540,
                height: i === 0 ? 1080 : 540,
                priority: true,
              }}
            />
          ))}
        </div>
        <BlogList posts={posts} />
        {/*     <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>*/}
        <Hero
          headline="Wir kümmern uns um ihre Technik"
          description="Im Müritzphone Shop Röbel, finden Sie alles was Sie für Ihr Smartphone, Tablet oder Notebook benötigen. Wir bieten Ihnen eine große Auswahl an Zubehör, Ersatzteilen und Reparaturen."
        />
        {/*
        <Grid layout="B" variant="filled">
          {products.slice(0, 3).map((product: any, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
              imgProps={{
                alt: product.name,
                width: i === 1 ? 1080 : 540,
                height: i === 1 ? 1080 : 540,
              }}
            />
          ))}
        </Grid>
        
        <Marquee>
          {products.slice(3).map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} variant="slim" />
          ))}
        </Marquee>
         <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
        <iframe
          className="w-full"
          loading="lazy"
          src="https://www.google.com/maps/embed/v1/place?key=API_KEY
    &q=Space+Needle,Seattle+WA"
        ></iframe>
      </div>
    </>
  )
}

Home.Layout = Layout
