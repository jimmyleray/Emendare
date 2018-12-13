import Head from 'next/head'
import { Navbar, Metas } from '../templates'

export const Page = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
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
