import Head from 'next/head'
import { Navbar } from './navbar'

export const Page = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <Navbar />
    </header>
    <main>{children}</main>
  </>
)
