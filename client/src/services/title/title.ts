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
    this.updateTitle()
  }

  get documentTitle(): string {
    return `${this._badgeCount > 0 ? `(${this._badgeCount}) ` : ''}${
      this.applicationTitle
    }${this._pageTitle ? ` | ${this._pageTitle}` : ''}`
  }

  private updateTitle() {
    document.title = this.documentTitle
  }
}

export const Title = new TitleService()
