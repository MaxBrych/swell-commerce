import About from '@components/about/About'
import { Layout } from '@components/common'
import React from 'react'

export default function AboutPage() {
  return (
    <div>
      <div className="flex items-center justify-center w-full h-48 mb-8 text-2xl bg-gray-300 text-bold">
        Über Uns
      </div>
      <About />
    </div>
  )
}

AboutPage.Layout = Layout
