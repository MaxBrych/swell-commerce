import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import Image from 'next/image'
import commerce from '@lib/api/commerce'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
  categories?: any[]
}

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

export default function Navbar({
  products,
  categories = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleIsOpen = () => setIsOpen(!isOpen)
  console.log(categories)
  return (
    <NavbarRoot>
      <Container clean className={s.navContainer}>
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <nav className={s.navMenu}>
              <Link href="/search" className={s.link}>
                All
              </Link>
              <Link
                onMouseOver={toggleIsOpen}
                href="/search"
                className={s.link}
              >
                Produkte
              </Link>
              <div
                className={`${
                  isOpen ? 'block' : 'hidden'
                } fixed grid grid-cols-3 gap-x-16 top-[64px] p-6 h-32 w-[99vw] z-20 bg-primary bg-white `}
              >
                <div>
                  <div className="grid items-center justify-center grid-cols-3 grid-rows-2 py-16 md:grid-rows-1 md:grid-cols-6">
                    {categories.map((categorie: any) => (
                      <Link
                        href={`/search/${categorie.slug}`}
                        key={categorie.id}
                      >
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
                </div>
              </div>
              {/*  {links?.map((l) => (
              <Link href={l.href} key={l.href} className={s.link}>
                {l.label}
              </Link>
            ))}*/}
            </nav>
          </div>
          <Link href="/" className={s.logo} aria-label="Logo">
            {/*<Logo />*/}
            <Image
              src="https://cdn.discordapp.com/attachments/911669935363752026/1088717883363840130/Logo.png"
              alt="Logo"
              width={144}
              height={56}
              className=""
            />
          </Link>
          {/* 
          {process.env.COMMERCE_SEARCH_ENABLED && (
            <div className="justify-center flex-1 hidden lg:flex">
              <Searchbar />
            </div>
          )}*/}
          <div className="flex items-center justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="flex pb-4 lg:px-6 lg:hidden">
            <Searchbar id="mobile-search" />
          </div>
        )}
      </Container>
    </NavbarRoot>
  )
}
