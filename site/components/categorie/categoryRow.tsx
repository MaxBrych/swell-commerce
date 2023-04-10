import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@components/product'
import getImageUrl from '../../../packages/spree/src/utils/get-image-url'

interface CategoryProps {
  categories: any
}

const CategoryRow: React.FC<CategoryProps> = ({ categories }) => (
  <div className="">
    <div className="sticky z-20 flex items-center w-full gap-4 px-4 py-4 overflow-x-auto bg-white md:py-8 top-16 md:grid md:grid-rows-1 md:items-center md:grid-cols-6">
      {categories.map((categorie: any) => (
        <Link
          href={`/search/${categorie.slug}`}
          key={categorie.id}
          className="flex flex-col items-center justify-center flex-shrink-0"
        >
          <Image
            src={categorie.getImageUrl}
            alt={''}
            width={32}
            height={32}
            className="w-12 h-12 rounded-full bg-slate-300"
          />
          <div className="py-2 text-sm font-semibold lg:text-base">
            {categorie.name}
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default CategoryRow
