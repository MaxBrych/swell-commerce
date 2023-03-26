import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@components/product'

interface CategoryProps {
  categories: any
}

const CategoryRow: React.FC<CategoryProps> = ({ categories }) => (
  <div className="">
    <div className="sticky bg-white items-center  top-16 w-full flex z-20 overflow-x-auto  md:grid gap-4 py-4 md:grid-rows-1 md:items-center md:grid-cols-6">
      {categories.map((categorie: any) => (
        <Link
          href={`/search/${categorie.slug}`}
          key={categorie.id}
          className="flex-shrink-0 justify-center flex flex-col items-center"
        >
          <Image
            src={categorie.image}
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
