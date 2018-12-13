const bulma = 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css'
const fontAwesome = 'https://use.fontawesome.com/releases/v5.3.1/js/all.js'

export const Metas = () => (
  <>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href={bulma} />
    <script defer src={fontAwesome} />
  </>
)
