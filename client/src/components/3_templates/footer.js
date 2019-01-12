import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../config'

const footerLinkStyle = {
  textDecoration: 'none',
  display: 'block',
  marginBottom: '1rem'
}

export const Footer = () => (
  <footer>
    <Link to={path.code} style={footerLinkStyle}>
      Charte éthique
    </Link>
    <Link to={path.roadmap} style={footerLinkStyle}>
      Roadmap
    </Link>
    <Link to={path.contributors} style={footerLinkStyle}>
      Contributeurs
    </Link>
    <Link to={path.legal} style={footerLinkStyle}>
      Mentions légales
    </Link>
    <a href="https://gitlab.com/emendare/emendare" style={footerLinkStyle}>
      Sources / GitLab
    </a>
  </footer>
)
