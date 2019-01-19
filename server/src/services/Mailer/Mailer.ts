import nodemailer from 'nodemailer'

export class Mailer {
  private transporter: any

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: Boolean(process.env.MAIL_SECURE),
        auth: {
          user: process.env.MAIL_AUTH_USER,
          pass: process.env.MAIL_AUTH_PASS
        },
        tls: {
          ciphers: 'SSLv3'
        }
      },
      {
        from: process.env.MAIL_AUTH_USER
      }
    )
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
    return this.transporter.sendMail(options)
  }
}
