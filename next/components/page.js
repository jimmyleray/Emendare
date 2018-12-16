import Head from 'next/head'
import { Navbar, Metas, Providers } from '../components'
import { pageTitle } from '../utils'

export const Page = ({ pageName, children }) => (
  <Providers>
    <Head>
      <title>{pageTitle(pageName)}</title>
      <Metas />
    </Head>
    <header>
      <Navbar />
    </header>
    <main>
      <section className="section">
        <div className="container">{children}</div>
      </section>
    </main>
  </Providers>
)
