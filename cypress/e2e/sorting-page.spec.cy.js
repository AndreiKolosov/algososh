describe('Sorting page test', () => {
  it('Input should be empty', () => {
    cy.visit('/recursion');
    cy.get('input').should('have.value', '');
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
          cy.wrap(el).find('div[class*=circle_changing]');
        }
        if (index === 1) {
          cy.wrap(el).find('div[class*=circle_default]');
        }
      });

    cy.get('div[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        cy.wrap(el).contains(3 - index);
        cy.wrap(el).find('div[class*=modified]');
      });
  });
});
