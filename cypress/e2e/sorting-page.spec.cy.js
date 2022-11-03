describe('Sorting page test', () => {
  it('Input should be clear', () => {
    cy.visit('http://localhost:3000/algososh/recursion');
    cy.get('input').clear();
  });

  it('Button should be disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Should render circles correctly', () => {
    cy.get('input').type('123');
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        cy.wrap(el).contains(index + 1);
        if (index === 0 || index === 2) {
          cy.wrap(el).find('[class*=circle_changing]');
        }
        if (index === 1) {
          cy.wrap(el).find('[class*=circle_default]');
        }
      });

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        cy.wrap(el).contains(3 - index);
        cy.wrap(el).find('[class*=modified]');
      });
  });
});
