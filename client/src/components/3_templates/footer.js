import React from 'react'
import { Link } from '../../components'
import { path } from '../../config'

const links = [
  { url: path.news, title: 'Actualités' },
  { url: path.code, title: 'Charte éthique' },
  { url: path.contributors, title: 'Contributeurs' },
  { url: path.legal, title: 'Mentions légales' },
  { url: 'https://gitlab.com/emendare/emendare', title: 'Sources / GitLab' }
]

export const Footer = () => (
  <footer>
    {links.map(link => (
      <Link
        key={link.url}
        to={link.url}
        style={{
          display: 'block',
          textDecoration: 'none',
          marginBottom: '1rem',
          marginLeft: '1rem'
        }}
      >
        {link.title}
      </Link>
    ))}
  </footer>
)
