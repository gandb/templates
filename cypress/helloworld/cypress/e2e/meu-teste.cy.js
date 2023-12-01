///  <reference types="cypress" />

describe('Usando Cypress ', () => {
  it('get', () => {
    cy.visit('http://localhost:8080');
    cy.get('h1').contains("Hello World");
    cy.get('p').contains("HTML");
    cy.title().should('eq', 'Minha Primeira Página');
    
    cy.get('#botao').should("have.text","aperte-me");
    cy.get("#botao").click();
    cy.get('#botao').should("have.text","apertado");
    cy.get("#botao").click();
    cy.get('#botao').should("have.text","aperte-me");

    //asincrono
    cy.get("#botao").invoke("text").then((text)=>{
      expect("aperte-me").to.be.equal(text);
    });
    cy.wait(3500).get('#botao').should("have.text","apertado");
    cy.get(".gender").first().next().click();
    const obj = {
      name:"Edson"
    };
    cy.wrap(obj).should("have.property","name").then((name)=> {
      cy.log(name);
      expect(name).to.be.equals("Edson");
    });


    cy.get(".food").check(["coke","pepper"]);
  }
  ),
  it('fixtures', () => {
    cy.visit('http://localhost:8080/user');
    cy.fixture('user.json').as('userData');
    cy.get('@userData').then((userData)=>{
      cy.get(".email").clear().type(userData.email);
    });
  }
  )
  ,
  it('stub and  alerts', () => {
    cy.visit('http://localhost:8080/user');
    const stub = cy.stub();
    //como o cypress converte o alerta para evento, pode-se usar o cy.on para ouvir o alerta
    cy.on('window:alert', stub);
 

    //outra forma de capturar informacoes é a seguir:
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
      //cy.stub(win.console, 'log').as('consoleLog');
    });
 
    
    cy.get('#updateUser')
      .click()
      .then(() => {
        //stub substitui completamente a funcao
        expect(stub.getCall(0)).to.be.calledWith('Atualizado com sucesso!');
        //spy apenas observa o que é passado pra função
        cy.get('@consoleLog').should('have.been.calledWith', 'teste');

      });
 

    
     
  }
  )


 
  });