import cn from 'clsx'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import type { Product } from '@commerce/types/product'

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import { Container } from '@components/ui'
import { Layout } from '@components/common'
import ErrorMessage from '@components/ui/ErrorMessage'

export default function Categories({ categories }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)

  const activeCategory = categories.find((cat: any) => cat.slug === category)

  const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  return (
    <Container>
      {/* Categories */}
      <div className="relative inline-block w-full">
        <div className="lg:hidden">
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              onClick={(e) => handleClick(e, 'categories')}
              className="flex justify-between w-full px-4 py-3 text-sm font-medium leading-5 transition duration-150 ease-in-out border rounded-sm border-accent-3 bg-accent-0 text-accent-4 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              {activeCategory?.name
                ? `Category: ${activeCategory?.name}`
                : 'All Categories'}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>
        <div
          className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
            activeFilter !== 'categories' || toggleFilter !== true
              ? 'hidden'
              : ''
          }`}
        >
          <div className="rounded-sm shadow-xs bg-accent-0 lg:bg-none lg:shadow-none">
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <ul>
                <li
                  className={cn(
                    'block text-sm leading-5 text-accent-4 lg:text-base lg:no-underline lg:font-bold lg:tracking-wide hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                    {
                      underline: !activeCategory?.name,
                    }
                  )}
                >
                  <Link
                    href={{ pathname: getCategoryPath('', brand), query }}
                    legacyBehavior
                  >
                    <a
                      onClick={(e) => handleClick(e, 'categories')}
                      className={
                        'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                      }
                    >
                      All Categories
                    </a>
                  </Link>
                </li>
                {categories.map((cat: any) => (
                  <li
                    key={cat.path}
                    className={cn(
                      'block text-sm leading-5 text-accent-4 hover:bg-accent-1 lg:hover:bg-transparent hover:text-accent-8 focus:outline-none focus:bg-accent-1 focus:text-accent-8',
                      {
                        underline: activeCategory?.id === cat.id,
                      }
                    )}
                  >
                    <Link
                      href={{
                        pathname: getCategoryPath(cat.path, brand),
                        query,
                      }}
                      legacyBehavior
                    >
                      <a
                        onClick={(e) => handleClick(e, 'categories')}
                        className={
                          'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4'
                        }
                      >
                        {cat.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

Categories.Layout = Layout
