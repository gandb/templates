// ==UserScript==
// @name        Novo Banco - Add user
// @namespace   Violentmonkey Scripts
// @match       https://*.novobanco.pt/*
// @grant       none
// @version     1.5
// @author      -
// @description 07/05/2025, 15:29:43
// ==/UserScript==


const CODIGO_UTILIZADOR = '2560366';
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
