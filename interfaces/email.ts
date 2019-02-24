export interface IEmail {
  subject: string
  html: (...vars: any[]) => string
}
