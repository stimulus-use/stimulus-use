context('useWindowFocus', () => {
  it('should be focused from the beginning', () => {
    cy.visit('http://localhost:8080')
    cy.get('[data-controller="window-focus"]').contains('Window : focused')
  })

  it('should adjust if the window get focused and unfocused', () => {
    cy.visit('http://localhost:8080')

    cy.window().then((win) => {
      win.document.hasFocus = () => false
      cy.get('[data-controller="window-focus"]').contains('Window : not focused')
    })

    cy.window().then((win) => {
      win.document.hasFocus = () => true
      cy.get('[data-controller="window-focus"]').contains('Window : focused')
    })

    cy.window().then((win) => {
      win.document.hasFocus = () => false
      cy.get('[data-controller="window-focus"]').contains('Window : not focused')
    })
  })

  it('should be unfocused from the beginning', () => {
    cy.visit('http://localhost:8080', {
      onBeforeLoad(win) {
        cy.stub(win.document, 'hasFocus').returns(false)
      }
    })

    cy.get('[data-controller="window-focus"]').contains('Window : not focused')
  })
})
