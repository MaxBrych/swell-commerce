import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@components/product'

interface CategoryProps {
  categories: any
}

const CategoryGrid: React.FC<CategoryProps> = ({ categories }) => (
  <div className="px-4 md:px-8 lg:px-16 ">
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
  </div>
)

export default CategoryGrid
