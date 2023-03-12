import Link from 'next/link'
import React from 'react'

function ClientSideRoute({
  children,
  route,
}: {
  children: React.ReactNode
  route: string
}) {
  return (
    <Link
      className="flex-shrink-0 w-[75vw] md:w-[33vw] lg:w-full lg:flex-1"
      href={route}
    >
      {children}
    </Link>
  )
}

export default ClientSideRoute
