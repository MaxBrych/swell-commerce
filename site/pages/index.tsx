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
      <div className="px-4 md:px-6 ">
        <div className="my-4">
          <div className="h-[90vh] bg-[url('https://cdn.discordapp.com/attachments/1084536803157090514/1084563027917033522/Stage_Bledner.png')]  bg-no-repeat bg-cover bg-center bg-fixed rounded-3xl">
            <div className="flex flex-col items-center justify-center h-full gap-5">
              <h1 className="text-5xl font-bold text-center text-white">
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
        <div className="grid items-center justify-center grid-cols-3 grid-rows-2 py-16 md:grid-rows-1 md:grid-cols-6">
          {categories.map((categorie: any) => (
            <Link href={`/search/${categorie.slug}`} key={categorie.id}>
              <Image
                src={categorie.image}
                alt={''}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full bg-slate-300"
              />
              <div className="py-2 text-sm font-semibold lg:text-lg">
                {categorie.name}
              </div>
            </Link>
          ))}
        </div>
        <ProductList products={products} />
        <Kunden kunden={kunden} />
        <Vertragspartner />
        <Dienstleistungen />
        <Hero
          headline="Wir kümmern uns um ihre Technik"
          description="Im Müritzphone Shop Röbel, finden Sie alles was Sie für Ihr Smartphone, Tablet oder Notebook benötigen. Wir bieten Ihnen eine große Auswahl an Zubehör, Ersatzteilen und Reparaturen."
        />
        <BlogList posts={posts} />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2380.1903661234505!2d12.603554015768516!3d53.37564328021764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a9551f03a7d6c1%3A0x79557130cae33f59!2sM%C3%BCritzPhone!5e0!3m2!1sde!2sde!4v1679595106061!5m2!1sde!2sde"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </>
  )
}

Home.Layout = Layout
