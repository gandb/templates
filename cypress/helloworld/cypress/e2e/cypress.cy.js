///  <reference types="cypress" />

describe('Usando Cypress ', () => {
    it('get', () => {
      cy.visit('https://example.cypress.io');
      cy.get('h1').contains("Kitchen Sink");
      //should leva 4 segundos até aparecer
      cy.get('h1').should("have.text","Kitchen Sink");
      cy.get('h1').should("contain.text","Sink");
      cy.get('h1').each((element,index)=> expect(element.text().toLocaleLowerCase(),"teste").to.be.equal("kitchen sink".toLowerCase()));
    })
    
  })