/* eslint-disable jest/valid-expect */
import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';
describe('List page test', () => {
  it('Inputs should be empty', () => {
    cy.visit('/list');
    cy.get('input').each((el) => cy.wrap(el).should('have.value', ''));
  });

  it('Add-buttons and remove by index should be disabled', () => {
     cy.get('button').eq(1).should('be.disabled');
     cy.get('button').eq(2).should('be.disabled');
     cy.get('button').eq(5).should('be.disabled');
     cy.get('button').eq(6).should('be.disabled');
  });

  it('Should correctly render default random list', () => {
    cy.get('div[class*=circle_content]').should(($div) => {
      if ($div.length <= 0 || $div.length > 4) {
        throw new Error('Expected to have length from 1 to 4');
      }
    })
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
    cy.get('div[class*=circle_content] p[class*=text_type_circle]').each((el) =>
      cy.wrap(el).should(($el) => {
        if ($el.length <= 0 || $el.length > 4) {
          throw new Error('Expected to have length from 1 to 4');
        }
      }),
    );
  });

  it('Add input value cant be longer then 4', () => {
    cy.get('input').eq(0).type(11111).should('have.value', '1111');
  });

  it('Should correctly add to list head', () => {
    cy.get('button').eq(1).click()
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', '1111');
    cy.get('div[class*=circle_changing]').should('be.visible');
    cy.get('div[class*=circle_modified]').eq(0).should('be.visible');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('div[class*=circle_default] p[class*=text]:first-of-type').eq(0).should('have.text', '1111');
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
  });

  it('Should correctly add to list tail', () => {
    cy.get('input').eq(0).type('qwe').should('have.value', 'qwe');
    cy.get('button').eq(2).click();
    cy.get('div[class*=circle_changing]').should('be.visible').should('have.text', 'qwe');
    cy.get('div[class*=circle_modified]').should('be.visible').should('have.text', 'qwe');
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('p[class*=text_type_circle]').eq(-1).should('have.text', 'qwe');
  });

  it('Should correctly remove from head', () => {
    cy.get('input').eq(0).type('rty').should('have.value', 'rty');
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('button').eq(3).click();
    cy.get('div[class*=circle_changing]').should('be.visible').should('have.text', 'rty');
    cy.get('p[class*=text_type_circle]').eq(0).should('have.text', '');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('p[class*=text_type_circle]').eq(0).should('have.text', '1111');
    cy.get('div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
    cy.get('div[class*=text]:last-of-type').eq(-1).should('have.text', 'tail');
  });

  it('Should correctly remove from tail', () => {
    cy.get('input').eq(0).type('123').should('have.value', '123');
    cy.get('button').eq(2).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('button').eq(4).click();
    cy.get('div[class*=circle_changing]').should('be.visible').should('have.text', '123');
    cy.get('p[class*=text_type_circle]').eq(-2).should('have.text', '');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('p[class*=text_type_circle]').eq(-1).should('have.text', 'qwe');
    cy.get('div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
    cy.get('div[class*=text]:last-of-type').eq(-1).should('have.text', 'tail');
  });

  it('Should correctly add by index', () => {
    cy.get('input').eq(0).type('ggg').should('have.value', 'ggg');
    cy.get('button').eq(1).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('input').eq(0).type('x');
    cy.get('input').eq(1).type('2');
    cy.get('button').eq(5).click();
    cy.get('div[class*=circle_changing]').should('be.visible');
    cy.get('p[class*=text_type_circle]').eq(0).should('have.text', 'x');
    cy.get('div[class*=circle_modified] p[class*=text_type_circle]').should('have.text', 'x');
    cy.wait(DELAY_IN_MS);
    cy.get('p[class*=text_type_circle]').eq(1).should('have.text', '1111');
    cy.get('div[class*=circle_modified]').should('not.exist');
  });


  it('Should correctly remove by index', () => {
    cy.get('input').eq(1).type('2');
    cy.get('button').eq(6).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('div[class*=circle_changing]').should('have.length', 2);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('div[class*=circle_changing]').should('have.length', 4);
    cy.get('p[class*=text_type_circle]').eq(1).should('have.text', '1111');
    cy.get('div[class*=circle_modified]').should('not.exist');
  });

});