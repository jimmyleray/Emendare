import mjml2html from 'mjml'
import { header, footer } from './components'

export const activation = (activationToken: string) =>
  mjml2html(`
<mjml>
<mj-body>
  ${header}
  <mj-section background-color="#fafafa">
    <mj-column width="400px">
      <mj-text font-style="italic" font-size="20px" color="#626262">Activation du compte</mj-text>
      <mj-text color="#525252">Cliquez sur le lien ci-dessous pour activer votre compte :</mj-text>
      <mj-button background-color="#2a3448" href="https://emendare.org/activation/${activationToken}">Activer mon compte</mj-button>
      <mj-text color="#525252">L'équipe d'Emendare</mj-text>
    </mj-column>
  </mj-section>
  ${footer}
</mj-body>
</mjml>
`)
