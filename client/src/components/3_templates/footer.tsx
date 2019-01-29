import React from 'react'
import { Button, Link, DataContext, UserContext } from '../../components'
import { path } from '../../config'
import { Title } from '../../services'

const links: any[] = [
  { url: path.news, title: 'Actualités' },
  { url: path.code, title: 'Charte éthique' },
  { url: path.contributors, title: 'Contributeurs' },
  { url: path.legal, title: 'Mentions légales' },
  { url: 'https://gitlab.com/emendare/emendare', title: 'Sources / GitLab' }
]

export const Footer = () => (
  <UserContext.Consumer>
    {({ user }) => (
      <DataContext.Consumer>
        {({ get }) => {
          const events = get('events')('all')

          if (user && events && events.data) {
            const newEventsCount: number = events.data.filter(
              (event: any) =>
                new Date(event.created).getTime() >
                new Date(user.lastEventDate).getTime()
            ).length

            const eventLink = links.find(
              (link: any) => link.title === 'Actualités'
            )

            eventLink.badge = newEventsCount
            Title.badgeCount = newEventsCount
          }

          return (
            <footer>
              {links.map((link: any) => (
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
                  {link.badge && link.badge > 0 ? (
                    <>
                      {' '}
                      <Button
                        className="is-rounded is-primary is-small has-text-dark"
                        style={{ marginLeft: '6px' }}
                      >
                        {link.badge}
                      </Button>
                    </>
                  ) : (
                    ''
                  )}
                </Link>
              ))}
            </footer>
          )
        }}
      </DataContext.Consumer>
    )}
  </UserContext.Consumer>
)
