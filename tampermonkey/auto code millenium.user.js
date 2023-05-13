// ==UserScript==
// @name         auto code millenium
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ind.millenniumbcp.pt/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=millenniumbcp.pt
// @grant        none
// ==/UserScript==

const CODIGO_UTILIZADOR = 'FVCJ120704';

(function() {
    'use strict';

    // Your code here...
    let iUserCode = document.getElementById('iUserCode');
    iUserCode.value = CODIGO_UTILIZADOR;
})();