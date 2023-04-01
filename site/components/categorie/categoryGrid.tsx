import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@components/product'
import getImageUrl from '../../../packages/spree/src/utils/get-image-url'

interface CategoryProps {
  categories: any
}

const CategoryGrid: React.FC<CategoryProps> = ({ categories }) => (
  <div className="px-4 md:px-8 lg:px-16 ">
    <div className="grid items-center justify-center grid-cols-3 grid-rows-2 py-16 md:grid-rows-1 md:grid-cols-6">
      {categories.map((categorie: any) => (
        <Link
          href={`/search/${categorie.slug}`}
          key={categorie.id}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={categorie.getImageUrl}
            alt={''}
            width={32}
            height={32}
            className="w-8 h-8 bg-gray-300 rounded-full md:h-12 md:w-12"
          />
          <div className="py-2 text-sm font-semibold lg:text-lg">
            {categorie.name}
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default CategoryGrid
