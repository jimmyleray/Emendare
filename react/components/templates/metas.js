import config from '../../config'

export const Metas = () => (
  <>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content={config.metas.viewport} />
    {config.metas.stylesheets.map(stylesheet => (
      <link rel="stylesheet" href={stylesheet.href} key={stylesheet.href} />
    ))}
    {config.metas.scripts.map(script => (
      <script src={script.src} defer={script.defer} key={script.src} />
    ))}
  </>
)
