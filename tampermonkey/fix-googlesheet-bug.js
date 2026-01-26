// ==UserScript==
// @name         Fix Google Sheet Bug
// @namespace    https://docs.google.com
// @version      0.1
// @description  Se for uma planilha do google, automaticamente ele da um refresh quando entra na planilha visto que ela tem bug pra chrome no linux
// @author       You
// @match        https://docs.google.com/spreadsheets/*
// @icon         https://ssl.gstatic.com/docs/spreadsheets/spreadsheets_2023q4.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here... 
    log ('Fix Google Sheet Bug V1.0');
    const elements = document.querySelectorAll(".vac-doses");


    document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        document.location.reload();
    } else {
        //console.log("A aba deixou de estar ativa");
    }
    });
    

    function log(...args){
        console.log('FG:',...args);
    }


    function error(...args){
        console.error('FG:',...args);
    }
})();