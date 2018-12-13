import Link from 'next/link'

const links = [
  { pathname: '/', title: 'Home' },
  { pathname: '/login', title: 'Login' }
]

export const Navbar = () => (
  <nav>
    {links.map(link => (
      <Link href={link.pathname}>{link.title}</Link>
    ))}
  </nav>
)
