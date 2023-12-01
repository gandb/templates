///  <reference types="cypress" />

describe.skip('template spec 1', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  })
})
describe('outros testes', () => {
  it.only('passes1', () => {
    const arr1 = [1,2,3];
    const number1 = 33;
    expect(arr1).to.have.members([3,2,1]);
    expect(arr1).to.include.members([3,2]);
    expect(number1).to.be.a("number");
    expect(arr1).to.be.a("array");
    expect(arr1).to.be.an("array");
  })
})
describe('template spec 2', () => {
  it.only('passes1', () => {
    //only obriga passar e não passa o que não for only
    const bananas =1 ;
    const carro1 = {cor:"verde",ano:2022};
    const carro2 = {cor:"verde",ano:2022};
    expect(bananas,"Validar Banana").to.be.equal(1);
    expect(bananas==1,"Validar Banana").to.be.true;
    expect(JSON.stringify(carro1)==JSON.stringify(carro2),"Validar Carro").to.be.true;
    expect(carro1,"Validar Carro").to.be.deep.equal(carro2);
    expect(carro1,"Validar Carro").to.be.include({cor:"verde"});
    expect(carro1,"Validar Carro").to.have.property("cor");
    
  }),
  it.only('exercicio 2', () => {
    //only obriga passar e não passa o que não for only
    const carro1 = {cor:"verde",ano:2022,empty:false};
    const carro2 = {cor:"verde",ano:2022,empty:false};
    const carro3 = {empty:true};
    expect(JSON.stringify(carro1)==JSON.stringify(carro2),"Validar Carro").to.be.true;
    expect(carro1,"Validar Carro").to.be.deep.equal(carro2);
    expect(carro1,"Validar Carro").to.be.include({cor:"verde"});
    expect(carro1,"Validar Carro").to.have.property("cor");
    expect(carro3.empty,"Validar Carro").to.be.true;
    //outro tipo de vazio
    const carro4 = {};
    expect(JSON.stringify(carro4),"Validar Carro").to.be.equal("{}");
    expect(carro4,"Validar Carro").to.be.empty;
    expect(carro1,"Validar Carro").to.be.not.empty;
    expect(carro1,"Validar Carro").to.not.be.empty;
    
  }),
  it('passes2', () => {
    cy.visit('https://example.cypress.io');
  }),
  it.skip('passes3', () => {
    //skip pula o teste
    cy.visit('https://example.cypress.io');
  })
})