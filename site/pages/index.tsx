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
import Vertragspartner from '@components/Vertragspartner/Vertragspartner'
import Dienstleistungen from '@components/dienstleistungen/Dienstleistungen'
import ProductList from '@components/product/ProductList/ProductList'
import Kunden from '@components/kunden/Kunden'
import CategoryGrid from '@components/categorie/categoryGrid'
import Karte from '@components/maps/Karte'
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
const postQuery = groq`
*[_type=='post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`
const kundenQuery = groq`
*[_type=='kunden']{
  name,
  kommentar
} 
`

export const revalidate = 30

export default function Home({
  products,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [documents, setDocuments] = useState(null)
  const [posts, setPosts] = useState([])
  const [kunden, setKunden] = useState([])

  useEffect(() => {
    const fetchKunden = async () => {
      const data = await client.fetch(kundenQuery)
      setKunden(data)
    }
    fetchKunden()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await client.fetch(postQuery)
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <>
      <div className="font-sk-modernist font-normal">
        <div className="">
          <div className="h-[90vh] bg-[url('https://cdn.discordapp.com/attachments/1084536803157090514/1084563027917033522/Stage_Bledner.png')]  bg-no-repeat bg-cover bg-center ">
            <div className="flex flex-col items-center justify-center h-full gap-5">
              <h1 className="text-3xl font-bold text-center text-black md:text-5xl">
                Hier findest du <br /> was du suchst
              </h1>
              <Link
                href="/products"
                className="flex items-center justify-center h-12 p-8 bg-orange-500 rounded-full"
              >
                Zum Shop
              </Link>
            </div>
          </div>
        </div>
        <CategoryGrid categories={categories} />

        <ProductList products={products} />

        <Vertragspartner />
        <Dienstleistungen />
        <Hero
          headline="Wir kümmern uns um ihre Technik"
          description="Im Müritzphone Shop Röbel, finden Sie alles was Sie für Ihr Smartphone, Tablet oder Notebook benötigen. Wir bieten Ihnen eine große Auswahl an Zubehör, Ersatzteilen und Reparaturen."
        />
        <BlogList posts={posts} />
        <Kunden kunden={kunden} />
        <Karte />
      </div>
    </>
  )
}

Home.Layout = Layout
