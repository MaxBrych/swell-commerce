import About from '@components/about/About'
import { Layout } from '@components/common'
import Link from 'next/link'
import React from 'react'

export default function SuccessPage() {
  return (
    <div>
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <h1 className="mb-8 text-3xl font-bold text-center md:text-5xl">
          Deine Bestellung <br /> war erfolgreich
        </h1>
        <Link
          href="/"
          className="flex items-center justify-center px-8 text-lg font-bold transition-colors duration-150 bg-gray-300 rounded-full h-14 hover:bg-gray-200"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  )
}

SuccessPage.Layout = Layout
