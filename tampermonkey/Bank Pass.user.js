// ==UserScript==
// @name         Bank Pass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remember tip
// @author       Gand
// @match        https://ib.rendimento.com.br/Acesso*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
  // Seleciona o primeiro elemento com a classe "box-login"
    const boxLogin = document.querySelector('.box-login');

    // Cria um novo elemento de parágrafo
    const paragraph = document.createElement('p');

    // Define o texto do parágrafo
    paragraph.textContent = 'Senha deve ter 8 dígitos';
      // Adiciona estilos ao parágrafo
    paragraph.style.color = 'red';
    paragraph.style.fontWeight = 'bold';


    // Adiciona o parágrafo ao elemento "box-login"
    boxLogin.appendChild(paragraph);
})();