class TitleService {
  private applicationTitle = 'Emendare'
  private _pageTitle: string | undefined
  private _badgeCount: number = 0

  constructor() {
    this.updateTitle()
  }

  set pageTitle(newPageTitle: string) {
    this._pageTitle = newPageTitle
    this.updateTitle()
  }

  set badgeCount(newBadgeCount: number) {
    this._badgeCount = newBadgeCount
    this.updateFavicon(
      this._badgeCount > 0
        ? '/images/favicon-indicator.png'
        : '/images/favicon.png'
    )
    this.updateTitle()
  }

  get documentTitle(): string {
    return `${this._badgeCount > 0 ? `(${this._badgeCount}) ` : ''}${
      this.applicationTitle
    }${this._pageTitle ? ` / ${this._pageTitle}` : ''}`
  }

  private updateTitle() {
    document.title = this.documentTitle
  }

  private updateFavicon(img: string) {
    let favicon = document.querySelector('link[rel="shortcut icon"]')

    if (!favicon) {
      favicon = document.createElement('link')
      favicon.setAttribute('rel', 'shortcut icon')
      const head = document.querySelector('head')
      if (head) {
        head.appendChild(favicon)
      }
    }

    favicon.setAttribute('type', 'image/png')
    favicon.setAttribute('href', img)
  }
}

export const Title = new TitleService()
