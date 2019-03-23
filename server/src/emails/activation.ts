import mjml2html from 'mjml'
import config from '../config'
import { header, footer } from './components'
import { IEmail } from '../../../interfaces'

export const activation: IEmail = {
  subject: 'Activation de votre compte Emendare',
  html: (activationToken: string) =>
    mjml2html(`
    <mjml>
    <mj-body width="100%">
      ${header}
      <mj-section background-color="#fafafa">
        <mj-column width="400px">
          <mj-text font-style="italic" font-size="20px" color="hsl(0, 0%, 21%)">Activation du compte</mj-text>
          <mj-text color="#525252">Cliquez sur le lien ci-dessous pour activer votre compte sur Emendare:</mj-text>
          <mj-button  href="${
            config.clientUrl
          }/activate/${activationToken}">Activer mon compte</mj-button>
          <mj-text align="right" color="#525252">L'équipe d'Emendare</mj-text>
        </mj-column>
      </mj-section>
      ${footer}
    </mj-body>
    </mjml>
    `).html
}
