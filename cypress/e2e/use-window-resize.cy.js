context('useWindowResize', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    cy.viewport(1000, 600)
  })

  it('should show the correct window dimensions on initial load', () => {
    cy.get('[data-window-size-target="width"]').contains('1000')
    cy.get('[data-window-size-target="height"]').contains('600')
  })

  it('should adjust the dimensions if the window gets resized', () => {
    cy.get('[data-window-size-target="width"]').contains('1000')
    cy.get('[data-window-size-target="height"]').contains('600')

    cy.viewport(1200, 700)

    cy.get('[data-window-size-target="width"]').contains('1200')
    cy.get('[data-window-size-target="height"]').contains('700')
  })

  it('should adjust the dimensions if the window gets resized a lot', () => {
    cy.get('[data-window-size-target="width"]').contains('1000')
    cy.get('[data-window-size-target="height"]').contains('600')

    for (let i = 1; i <= 250; i++) {
      cy.viewport(1000 + i, 600 + i)
    }

    cy.get('[data-window-size-target="width"]').contains('1250')
    cy.get('[data-window-size-target="height"]').contains('850')
  })
})
