import mjml2html from 'mjml'
import { header, footer } from './components'

export const reset = (newPassword: string) =>
  mjml2html(`
<mjml>
<mj-body width="100%">
  ${header}
  <mj-section background-color="#fafafa">
      <mj-column width="400px">
        <mj-text font-style="italic" font-size="20px" color="hsl(0, 0%, 21%)">Réinitialisation du mot de passe</mj-text>
        <mj-text color="#525252">Suite à votre demande de réinitialisation de mot de passe, veuilliez trouver ci-joint votre nouveau mot de passe pour vous connecter à votre compte. Il est recomandé de le changer rapidement sur votre page de profil.</mj-text>
        <mj-text font-size="18px">
          <mj-raw>
            Mot de passe : <span style="border-radius:5%; background-color:hsl(0, 0%, 96%); padding:7px">${newPassword}</span>
          </mj-raw>
        </mj-text>
        <mj-text align="right" color="#525252">L'équipe d'Emendare</mj-text>
      </mj-column>
    </mj-section>
  ${footer}
</mj-body>
</mjml>
`).html
