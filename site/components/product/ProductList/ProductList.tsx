// ProductList.tsx
import React from 'react'
import Link from 'next/link'
import { ProductCard } from '@components/product'

interface ProductListProps {
  products: any
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className="px-4 md:px-8 lg:px-16 ">
    <div className="flex items-stretch justify-between w-full py-2 text-2xl font-semibold">
      Beliebteste Produkte{' '}
      <Link
        href="/products"
        className="flex items-center justify-center px-5 text-sm rounded-full h-9 bg-slate-300"
      >
        Alle Produkte
      </Link>
    </div>
    <div className="flex w-full gap-4 overflow-x-scroll md:grid md:overflow-hidden md:grid-cols-4 ">
      {products.slice(0, 4).map((product: any, i: number) => (
        <ProductCard
          className="flex-shrink-0 w-[33vw] lg:w-full md:flex-1 "
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
  </div>
)

export default ProductList
