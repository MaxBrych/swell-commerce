import About from '@components/about/About'
import { Layout } from '@components/common'
import Service from '@components/services/Service'
import React from 'react'

export default function ServicePage() {
  return (
    <div>
      <Service />
    </div>
  )
}

ServicePage.Layout = Layout
