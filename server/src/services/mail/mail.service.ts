import { Injectable } from '@nestjs/common'
import { createTransport } from 'nodemailer'
import chalk from 'chalk'

@Injectable()
export class MailService {
  private transporter: any = null

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.transporter = createTransport(
        {
          service: 'Gmail',
          auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASS
          }
        },
        { from: process.env.MAIL_AUTH_USER }
      )
      console.log(chalk.cyan('Mailer service is activate'))
    } else {
      console.log(chalk.yellow('Mailer service is for production only'))
    }
  }

  /**
   * Méthode pour envoyer un mail
   * @param options Objet définissant le mail à envoyer
   * Exemple d'options valides :
   * {
   *   to: 'jimmy.leray@protonmail.com',
   *   subject: 'This is the mail subject',
   *   html: '<b>Hello world?</b>'
   * }
   */
  public send(options: any): Promise<any> {
    if (this.transporter) {
      return this.transporter.sendMail(options)
    } else {
      return Promise.reject()
    }
  }
}
