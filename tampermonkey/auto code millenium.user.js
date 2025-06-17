 // ==UserScript==
// @name         auto code millenium
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  try to take over the world!
// @author       You
// @match        <all_urls>
// @icon         https://www.google.com/s2/favicons?sz=64&domain=millenniumbcp.pt
// @grant        none
// ==/UserScript==

const CODIGO_UTILIZADOR = 'FVCJ120704';
let intervalo = null;

console.log("Iniciando Millenium Add user");

(function() {
    'use strict';

     console.log("Iniciando Millenium Add user");

    // Função para verificar se o campo está visível e preencher
    function preencherCampoQuandoVisivel() {

        let iUserCode = document.getElementById('nblogin-input');

        if(!iUserCode){
            iUserCode = document.getElementsByClassName('nblogin-input')[0];
        }

        if(!iUserCode){
            iUserCode = document.getElementById("TextBoxLogin_txField");
        }



        // Verificar se o campo existe e está visível
        if (iUserCode && iUserCode.offsetParent !== null) {
            console.log("Campo encontrado....");
            iUserCode.value = CODIGO_UTILIZADOR;
            console.log("Senha de 6 dígitos : 100 100 110 ");
            clearInterval(intervalo); // Parar o intervalo quando o campo for preenchido
        }
    }

    // Intervalo para verificar a cada 500ms
    intervalo = setInterval(preencherCampoQuandoVisivel, 500);
})();
