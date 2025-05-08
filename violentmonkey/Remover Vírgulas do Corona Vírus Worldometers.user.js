// ==UserScript==
// @name         Remover Vírgulas do Corona Vírus Worldometers
// @namespace    https://www.worldometers.info
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.worldometers.info/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeVirgulas(elemento)
    {
        const oldValue = elemento.innerHTML ;
        const newValue = oldValue.replaceAll(",","");
        elemento.innerHTML = newValue;
    }

    // Your code here...
    console.log('teste3 ');
    const elements = document.querySelectorAll(".maincounter-number span");

    for(var index=0;index<elements.length;index++)
    {
        removeVirgulas(elements[index]);
    }
    const actives = document.querySelector(".number-table-main");
    removeVirgulas(actives);




})();