import Link from 'next/link'
import s from './MenuSidebarView.module.css'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import type { Link as LinkProps } from './index'

export default function MenuSidebarView({
  links = [],
}: {
  links?: LinkProps[]
}) {
  const { closeSidebar } = useUI()

  return (
    <SidebarLayout handleClose={() => closeSidebar()}>
      <div className={s.root}>
        <nav>
          <ul>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/search">Alle</Link>
            </li>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link className={s.item} href="/service">
                Dienstleistungen
              </Link>
            </li>

            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/blog" className={s.item}>
                Blog
              </Link>
            </li>

            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/about" className={s.item}>
                Über Uns
              </Link>
            </li>
            <li className={s.item} onClick={() => closeSidebar()}>
              <Link href="/search" className={s.item}>
                Produkte
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </SidebarLayout>
  )
}

MenuSidebarView
