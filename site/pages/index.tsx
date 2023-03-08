import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

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

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="px-4">
        <div className="my-6  md:px-16">
          <div className="h-[66vh] bg-slate-200 rounded-3xl"></div>
        </div>
        <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 md:px-16">
          {products.slice(0, 4).map((product: any, i: number) => (
            <ProductCard
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
        {/*     <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>*/}
        <Hero
          headline=" Dessert dragée halvah croissant."
          description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
        />
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
        {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
      </div>
    </>
  )
}

Home.Layout = Layout
