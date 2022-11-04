describe('App routing test', () => {

  it('App is running', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
    cy.get('a').should('have.length', 6)
  });

  it('Recursion page is available', () => {
    cy.get('a[href*="/algososh/recursion"]').click();
    cy.get('a').click()
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Fibonacci page is available', () => {
    cy.get('a[href*="/algososh/fibonacci"]').click();
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Sorting page is available', () => {
    cy.get('a[href*="/algososh/sorting"]').click();
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Stack page is available', () => {
    cy.get('a[href*="/algososh/stack"]').click();
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Queue page is available', () => {
    cy.get('a[href*="/algososh/queue"]').click();
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('List page is available', () => {
    cy.get('a[href*="/algososh/list"]').click();
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

});
