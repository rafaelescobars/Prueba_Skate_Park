describe('Skate Park', () => {
  it('Frontpage can be opened', () => {
    cy.visit('http://localhost:4000')
    cy.contains('Skate Park')
  })

  it('Click test inputs login', () => {
    cy.visit('http://localhost:4000/login')
    cy.get('input:first').type('tonyhawk@skate.com')
  })

  it('Click test button login', () => {
    cy.visit('http://localhost:4000/login')
    cy.contains('Ingresar').click()
  })

})