import Link from 'next/link'

export const Navbar = () => (
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <Link href="/">
          <a class="navbar-item">Emendare</a>
        </Link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <Link href="/explore">
            <a class="navbar-item">Explorer</a>
          </Link>
        </div>
        <div class="navbar-end">
          <Link href="/login">
            <a class="navbar-item">Connexion</a>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)
