// ==UserScript==
// @name         auto code millenium
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @author       You
// @match        https://www.millenniumbcp.pt/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=millenniumbcp.pt
// @grant        none
// ==/UserScript==

const CODIGO_UTILIZADOR = 'FVCJ120704';

(function() {
    'use strict';

    // Função para verificar se o campo está visível e preencher
    function preencherCampoQuandoVisivel() {
        let iUserCode = document.getElementById('inptCode');

        // Verificar se o campo existe e está visível
        if (iUserCode && iUserCode.offsetParent !== null) {
            iUserCode.value = CODIGO_UTILIZADOR;
            clearInterval(intervalo); // Parar o intervalo quando o campo for preenchido
        }
    }

    // Intervalo para verificar a cada 500ms
    let intervalo = setInterval(preencherCampoQuandoVisivel, 500);
})();
