// https://docs.cypress.io/api/introduction/api.html

describe('Emendare Front Application', () => {
  it('should display the application title', () => {
    cy.visit('/')
    cy.contains('#app-title', 'Emendare')
  })
})
