import React from 'react'
import { Link } from 'react-router-dom'
import { Column, Columns } from '../../components'
import { path } from '../../config'

export const Footer = () => (
  <footer
    className="footer"
    style={{ padding: '1rem', backgroundColor: 'transparent' }}
  >
    <Columns className="content has-text-centered">
      <Column>
        <Link to={path.code}>Charte éthique</Link>
      </Column>
      <Column>
        <Link to={path.roadmap}>Roadmap</Link>
      </Column>
      <Column>
        <Link to={path.contributors}>Contributeurs</Link>
      </Column>
      <Column>
        <Link to={path.legal}>Mentions légales</Link>
      </Column>
      <Column>
        <a href="https://gitlab.com/emendare/emendare">Sources / GitLab</a>
      </Column>
    </Columns>
  </footer>
)
