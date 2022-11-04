describe('App routing test', () => {

  it('App is running', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
    cy.get('a').should('have.length', 6)
  });

  it('Recursion page is available', () => {
    cy.get('a[href*="/algososh/recursion"]').click();
    cy.get('h3').should('have.text', 'Строка');
    cy.get('a').click()
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Fibonacci page is available', () => {
    cy.get('a[href*="/algososh/fibonacci"]').click();
    cy.get('h3').should('have.text', 'Последовательность Фибоначчи');
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Sorting page is available', () => {
    cy.get('a[href*="/algososh/sorting"]').click();
    cy.get('h3').should('have.text', 'Сортировка массива');
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Stack page is available', () => {
    cy.get('a[href*="/algososh/stack"]').click();
    cy.get('h3').should('have.text', 'Стек');
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('Queue page is available', () => {
    cy.get('a[href*="/algososh/queue"]').click();
    cy.get('h3').should('have.text', 'Очередь');
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

  it('List page is available', () => {
    cy.get('a[href*="/algososh/list"]').click();
    cy.get('h3').should('have.text', 'Связный список');
    cy.get('a').click();
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
  });

});
