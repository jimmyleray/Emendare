import Head from 'next/head'
import { Navbar, Metas } from '../templates'
import { pageTitle } from '../../services'

export const Page = ({ pageName, children }) => (
  <>
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
  </>
)
