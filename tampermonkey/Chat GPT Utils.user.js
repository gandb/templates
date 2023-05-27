// ==UserScript==
// @name         Chat GPT Utils
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    const MODEL_NAME_ID = "modelName";

    function createModelDiv(){
        // Cria um novo elemento div
        const newDiv = document.createElement("div");


        // Adiciona o conteúdo de texto ao div
        newDiv.innerHTML = "Model Version: Undefined";

        // Define o ID do div
        newDiv.id = "modelLabel";

        // Define o CSS do div para posicioná-lo corretamente
        newDiv.style.position = "absolute";
        newDiv.style.right = "0";
        newDiv.style.bottom = "0";

        // Adiciona o novo div ao DOM
        document.body.appendChild(newDiv);

    }

    function updateDiv(version){
        const myDiv = document.getElementById("modelLabel");

        myDiv.innerHTML = "Model Version: " + version;
    }

    function createToTopButton(){


    }

    function createIDForModelName(){
         //console.log("createIDForModelName:start");
        const selector = '#__next > div > div > div > main > div > div > div > div > div.flex.items-center.justify-center';
        var element = document.querySelector(selector);
        if (!element) {
            console.log("Elemento não encontrado, id não modificado");
            return false;
        }
        element.id = "modelName";
        return "modelName";
    }

     function createAnchor(){
         const anchorId = MODEL_NAME_ID+"anchor";
        // console.log("createAnchor:start");
         var parent = document.getElementById(MODEL_NAME_ID);
        if (!parent) {
            console.log("Parent não encontrado, anchor não criada");
            return false;
        }
        var anchorElement = document.getElementById(anchorId);
         if(anchorElement)
         {
            return;
         }


     // Criar um novo elemento âncora
        var anchor = document.createElement("a");

        // Definir o atributo href
        anchor.href = "#" + MODEL_NAME_ID;

        // Definir o texto da âncora
        anchor.textContent = "Voltar ao topo";

        // Anexar a âncora ao body (ou a qualquer outro elemento pai)
        document.body.appendChild(anchor);


        // Define o CSS do botão para posicioná-lo corretamente
        anchor.style.position = "fixed";
        anchor.style.bottom = "20px";
        anchor.style.right = "20px";

        return "modelName";
    }



    createModelDiv();

    // Your code here...
    setInterval(function() {

        let id = createIDForModelName();

        if(id)
        {
            createAnchor(id);
        }

        var element = document.getElementById(id);

        if (!element) {
            updateDiv("Undefined");
            return;
        }

        updateDiv(element.textContent);

    }, 1000); // 30000 milissegundos = 30 segundos


})();