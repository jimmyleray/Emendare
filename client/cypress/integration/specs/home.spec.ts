describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('navigate to code page', () => {
    cy.contains('Charte éthique').click()
    cy.url().should('include', '/charte-ethique')
  })
})
