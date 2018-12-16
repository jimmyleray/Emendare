import Link from 'next/link'

export const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="container is-fluid">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">Emendare</a>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link href="/explore">
            <a className="navbar-item">Explorer</a>
          </Link>
        </div>
        <div className="navbar-end">
          <Link href="/login">
            <a className="navbar-item">Connexion</a>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)
