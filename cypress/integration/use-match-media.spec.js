context('useMatchMedia', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
    cy.viewport(1000, 600)
  })

  it('should match the "small" media query', () => {
    cy.get('[data-match-media-target="small"]').contains('not small')
    cy.get('[data-match-media-target="smallCount"]').contains('0')

    cy.viewport(319, 1000)

    cy.get('[data-match-media-target="small"]').contains('not small')
    cy.get('[data-match-media-target="smallCount"]').contains('0')

    cy.viewport(320, 1000)

    cy.get('[data-match-media-target="small"]').contains('is small')
    cy.get('[data-match-media-target="smallCount"]').contains('1')

    cy.viewport(321, 1000)

    cy.get('[data-match-media-target="small"]').contains('is small')
    cy.get('[data-match-media-target="smallCount"]').contains('1')

    cy.viewport(768, 1000)

    cy.get('[data-match-media-target="small"]').contains('is small')
    cy.get('[data-match-media-target="smallCount"]').contains('1')

    cy.viewport(769, 1000)

    cy.get('[data-match-media-target="small"]').contains('is small')
    cy.get('[data-match-media-target="smallCount"]').contains('1')

    cy.viewport(770, 1000)

    cy.get('[data-match-media-target="small"]').contains('not small')
    cy.get('[data-match-media-target="smallCount"]').contains('2')

    cy.viewport(769, 1000)

    cy.get('[data-match-media-target="small"]').contains('is small')
    cy.get('[data-match-media-target="smallCount"]').contains('3')
  })

  it('should match the "tall" media query', () => {
    cy.get('[data-match-media-target="tall"]').contains('not tall')
    cy.get('[data-match-media-target="tallCount"]').contains('0')

    cy.viewport(1100, 999)

    cy.get('[data-match-media-target="tall"]').contains('not tall')
    cy.get('[data-match-media-target="tallCount"]').contains('0')

    cy.viewport(1100, 1000)

    cy.get('[data-match-media-target="tall"]').contains('is tall')
    cy.get('[data-match-media-target="tallCount"]').contains('1')

    cy.viewport(1100, 1001)

    cy.get('[data-match-media-target="tall"]').contains('is tall')
    cy.get('[data-match-media-target="tallCount"]').contains('1')

    cy.viewport(1100, 1000)

    cy.get('[data-match-media-target="tall"]').contains('is tall')
    cy.get('[data-match-media-target="tallCount"]').contains('1')

    cy.viewport(1100, 999)

    cy.get('[data-match-media-target="tall"]').contains('not tall')
    cy.get('[data-match-media-target="tallCount"]').contains('2')
  })

  it('should match the "landscape" media query', () => {
    cy.get('[data-match-media-target="landscape"]').contains('is landscape')
    cy.get('[data-match-media-target="landscapeCount"]').contains('0')

    cy.viewport(600, 1000)

    cy.get('[data-match-media-target="landscape"]').contains('not landscape')
    cy.get('[data-match-media-target="landscapeCount"]').contains('1')

    cy.viewport(1000, 600)

    cy.get('[data-match-media-target="landscape"]').contains('is landscape')
    cy.get('[data-match-media-target="landscapeCount"]').contains('2')
  })
})
