import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Fibonacci page test', () => {
  it('Input should be empty', () => {
    cy.visit('http://localhost:3000/algososh/fibonacci');
    cy.get('input').should('have.value', '');
  });

  it('Button should be disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Numbers should render correctly', () => {
    cy.get('input').type(19);
    cy.get('button').eq(1).click();
    cy.get('button').eq(1).should('be.disabled');
    cy.wait(SHORT_DELAY_IN_MS * 20);
    cy.get('div[class*=circle_content]').should('have.length', 20);
    cy.get('div[class*=circle_content] div p:first-of-type').eq(19).should('have.text', '6765');
  });

  it('Input should be empty', () => {
    cy.visit('http://localhost:3000/algososh/fibonacci');
    cy.get('input').should('have.value', '');
  });

  it('Button should be disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

});
