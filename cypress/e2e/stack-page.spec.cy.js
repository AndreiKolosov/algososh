describe('Stack page test', () => {
  it('Input should be empty', () => {
    cy.visit('http://localhost:3000/algososh/stack');
    cy.get('input').should('have.value', '');
  })

  it('Buttons should be disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });

  it('Input value length cant be longer then 4', () => {
    cy.get('input').type(12345).should('have.value', '1234');
  });

  it('Stack element renders correctly', () => {
    cy.get('button').eq(1).click();
    cy.get('div[class*=circle_changing]')
    cy.get('div[class*=circle_default]');

    cy.get('input').type(33).should('have.value', '33');
    cy.get('button').eq(1).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]').should('have.length', 2);

    cy.get('input').type('qwe').should('have.value', 'qwe');
    cy.get('button').eq(1).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]').should('have.length', 3);
  })

  it('Stack element removes correctly', () => {
    cy.get('button').eq(2).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_circle]').should('have.length', 2);
    cy.get('div[class*=circle_default]').eq(1).should('have.text', '33');
    cy.get('button').eq(2).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_circle]').should('have.length', 1);
    cy.get('div[class*=circle_default]').should('have.text', '1234');
  });
  
  it('Stack clears correctly', () => {
    cy.get('input').type(1);
    cy.get('button').eq(1).click();
    cy.get('input').type(2);
    cy.get('button').eq(1).click();
    cy.get('input').type(3);
    cy.get('button').eq(1).click();
    cy.get('div[class*=circle_circle]').should('have.length', 4);
    cy.get('button').eq(3).click();
    cy.get('div[class*=circle_circle]').should('have.length', 0);
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });

});