import Head from 'next/head'
import { Navbar, Metas } from '../templates'
import { title } from '../../services'

export const Page = ({ pageName, children }) => (
  <>
    <Head>
      <title>{title(pageName)}</title>
      <Metas />
    </Head>
    <header>
      <Navbar />
    </header>
    <main>
      <section class="section">
        <div class="container">{children}</div>
      </section>
    </main>
  </>
)
