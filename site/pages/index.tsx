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
import Vertragspartner from '@components/sections/Vertragspartner/Vertragspartner'
import ProductList from '@components/product/ProductList/ProductList'
import Kunden from '@components/sections/kunden/Kunden'
import CategoryGrid from '@components/categorie/categoryGrid'
import Karte from '@components/sections/maps/Karte'
import Values from '@components/sections/values/Values'
import ServiceGrid from '@components/services/ServiceGrid'
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
      <div className="font-normal font-sk-modernist">
        <div className="h-[66vh] bg-[#FFF1D6] relative flex flex-col md:flex-row bg-no-repeat bg-cover bg-center ">
          <div className="right-0 w-full h-56 md:absolute">
            <Image
              className="right-0 object-fill w-full md:h-full md:absolute"
              src={''}
              alt={'alt'}
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col justify-center w-full gap-4 pl-4 md:left-0 md:absolute md:top-1/4 items-left">
            <h1 className="text-4xl font-bold text-left text-black md:text-5xl">
              Hier findest du <br /> was du suchst
            </h1>
            <p className="text-lg text-left text-gray-700 md:text-xl">
              Hier steht eine Beschreibung zum Shop und den Produkten
            </p>
            <Link href="/search">
              <span className="inline-flex items-center justify-center h-12 px-6 py-2 text-white bg-[#FF9900] rounded-full cursor-pointer">
                Zum Shop
              </span>
            </Link>
          </div>
        </div>
        <CategoryGrid categories={categories} />

        <ProductList products={products} />
        <ServiceGrid />
        <Vertragspartner />
        <Values />
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
