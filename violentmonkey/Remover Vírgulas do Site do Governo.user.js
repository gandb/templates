// ==UserScript==
// @name         Remover Vírgulas do Site do Governo
// @namespace    https://www.saopaulo.sp.gov.br/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.saopaulo.sp.gov.br/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeVirgulas(elemento)
    {
        const oldValue = elemento.innerHTML ;
        const newValue = oldValue.replaceAll(".","");
        elemento.innerHTML = newValue;
    }

    // Your code here...
    console.log('teste3 ');
    const elements = document.querySelectorAll(".vac-doses");


    for(var index=0;index<elements.length;index++)
    {
        //console.log('teste5 ',elements[index].innerHTML);
        removeVirgulas(elements[index]);
    }




})();