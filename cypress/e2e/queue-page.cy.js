describe('Queue page test', () => {

  it('Input should be empty', () => {
    cy.visit('/queue');
    cy.get('input').should('have.value', '');
  });

  it('Buttons should be disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });

  it('There should be 6 empty circles on the screen', () => {
    cy.get('div[class*=circle_circle]').should('have.length', 6);
    cy.get('div[class*=circle_content] div p:first-of-type')
      .each((el) => {
        cy.wrap(el).should('have.text', '')
      });
  });

  it('Input value length cant be longer then 4', () => {
    cy.get('input').type(12345).should('have.value', '1234');
    cy.get('button').eq(1).should('not.be.disabled');
  });

  it('Should correctly add items to queue', () => {
    cy.get('button').eq(1).click();
    cy.get('button').eq(1).should('be.disabled');
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]');
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').should('have.text', 'tail');
    cy.get('div[class*=circle_content] p[class*=text_type_input]').eq(0).should('have.text', '0');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');

    cy.get('input').type(222).should('have.value', '222');
    cy.get('button').eq(1).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]').should('have.length', 6);
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').eq(1).should('have.text', 'tail');
    cy.get('div[class*=circle_content] p[class*=text_type_input]').eq(1).should('have.text', '1');


    cy.get('input').type(333).should('have.value', '333');
    cy.get('button').eq(1).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]').should('have.length', 6);
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').eq(2).should('have.text', 'tail');
    cy.get('div[class*=circle_content] p[class*=text_type_input]').eq(2).should('have.text', '2');

    cy.get('input').type(444).should('have.value', '444');
    cy.get('button').eq(1).click();
    cy.get('input').type(555).should('have.value', '555');
    cy.get('button').eq(1).click();
    cy.get('input').type(66).should('have.value', '66');
    cy.get('button').eq(1).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]').should('have.length', 6);
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').eq(0).should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').eq(5).should('have.text', 'tail');
    cy.get('div[class*=circle_content] p[class*=text_type_input]').eq(5).should('have.text', '5');

    cy.get('input').should('be.disabled');
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Should correctly remove items from queue', () => {
    cy.get('button').eq(2).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]').should('have.length', 6);
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').eq(1).should('have.text', 'head');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').eq(5).should('have.text', 'tail');
    cy.get('div[class*=circle_content] p[class*=text_type_input]').eq(5).should('have.text', '5');

    cy.get('input').should('not.be.disabled');
    cy.get('button').eq(1).should('be.disabled');

    cy.get('button').eq(2).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_default]').should('have.length', 6);
    cy.get('div[class*=circle_content] div[class*=text]:first-of-type').eq(2).should('have.text', 'head');
    cy.get('div[class*=circle_content] p[class*=text_type_input]').eq(2).should('have.text', '2');
    cy.get('div[class*=circle_content] div[class*=text]:last-of-type').eq(5).should('have.text', 'tail');
    cy.get('div[class*=circle_content] p[class*=text_type_input]').eq(5).should('have.text', '5');
  });

  it('Should correctly clear queue', () => {
    cy.get('button').eq(3).click();
    cy.get('div[class*=circle_circle]').each((el) => {
      cy.wrap(el).contains('1').should('not.exist');
      cy.wrap(el).contains('2').should('not.exist');
      cy.wrap(el).contains('3').should('not.exist');
      cy.wrap(el).contains('4').should('not.exist');
      cy.wrap(el).contains('5').should('not.exist');
      cy.wrap(el).contains('6').should('not.exist');
      cy.wrap(el).contains('7').should('not.exist');
    });

    cy.get('div[class*=circle_content]').each((el) => {
      cy.wrap(el).contains('head').should('not.exist');
      cy.wrap(el).contains('tail').should('not.exist');
    });
    
    cy.get('div[class*=circle_default]').should('have.length', 6);
    cy.get('input').should('not.be.disabled').should('have.value', '');
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('button').eq(3).should('be.disabled');
  });

});
