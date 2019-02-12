import mjml2html from 'mjml'
import { header, footer } from './components'

export const reset = (newPassword: string) => `
<p>Voici votre nouveau mot de passe pour vous connecter : </p>
<p >${newPassword}</p>
`

export const resetPwdemail = (newPassword: string) =>
  mjml2html(`
<mjml>
<mj-body>
  ${header}
  <mj-section background-color="#fafafa">
    <mj-column width="400px">
      <mj-text font-style="italic" font-size="20px" color="#626262">Réinitilisation du mot de passe</mj-text>
      <mj-text color="#525252">Suite à votre demande de réinitilisation de mot de passe veuilliez trouver ci-joint le nouveau mot de passe pour vous connecter à votre cession. Il est recomandé de le changer le plus rapidement.</mj-text>
      <mj-text font-size="16px">Mot de passe : ${newPassword}</mj-text>
      <mj-text color="#525252">L'équipe d'Emendare</mj-text>
    </mj-column>
  </mj-section>
  ${footer}
</mj-body>
</mjml>
`)
