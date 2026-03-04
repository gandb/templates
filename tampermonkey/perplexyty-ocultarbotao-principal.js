// ==UserScript==
// @name         Ocultador Do Chat Principal
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  try to take over the world!
// @author       You
// @match        https://www.perplexity.ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
/*
TODO :
1-) quando realmente preciso enviar uma mensagem pelo campo, ao apertar o botao ele arma de novo o botao com um falso positivo.
2-) antes de entrar na thread, o campo de questao deveria sumir também

*/

(function() {
    'use strict';

    var terminate = false;
    var handleIntern = null;
    var handle=null;

    function cleanup(){
        terminate=false;
        if(handleIntern){
           clearInterval(handleIntern);
        }
    }

    function all(){
        function log(...args) {
            console.log("Ocultador Do Chat Principal: ",...args);
        }


        function error(...args) {
            console.log("Ocultador Do Chat Principal: ",...args);
        }


        log("v1.0.3 iniciando...");


        // Seleciona o div principal e o campo editável
        let mainDiv;
        let toggleButton;
        let displayBefore;
        let alreadyHadEvent = false;

        function fixSemantic(){
            const mainForm = document.querySelector('.bottom-safeAreaInsetBottom');

            if(!mainForm){
                return false;
            }

            if (!mainForm.classList.contains('mainForm')) {
                mainForm.classList.add("mainForm");
            }


            const toolbox = mainForm.querySelector("div.flex.items-center.justify-self-end.col-start-3.row-start-2");
            if (!toolbox.classList.contains('toolbox')) {
                toolbox.classList.add("toolbox");
            }

            // log(toolbox.innerHTML);

            const sendButton = toolbox.querySelector("div.ml-2");
            if (!sendButton.classList.contains('sendButton')) {
                sendButton.classList.add("sendButton");
            }

            return true;

        }

        function startInspection(){
            log("Observando elemento pai");
            // Cria o observer
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        // Verifica se o elemento foi re-adicionado
                        mutation.addedNodes.forEach((node) => {
                            if (node.matches && node.matches('.toolbox') && node.matches('.sendButton')) {
                                log("Elemento pai alterado, reafazendo listeners...");
                                if(!fixSemantic())
                                {

                                    terminate=false;
                                    return;
                                }
                                createListeners();
                            }
                        });
                    }
                });
            });

            // Observa o elemento pai
            observer.observe(mainDiv, {
                childList: true,
                subtree: true
            });

        }

        function createListeners(){

            log("Iniciando criação de listeners");

            if(toggleButton.style.display == 'visible')
            {
                log("Criação de listeners cancelada pois o campo não está visível, motivo 1");
                return;
            }

            const button = mainDiv.querySelector('.toolbox .sendButton');
            log("Botão encontrado:",button);

            const targetElement = document.querySelector('#seu-elemento');


            setTimeout(()=>{
                log("Eventos ao botão adicionados:",button);
                if(!button){
                    log("Criação de listeners cancelada pois o campo não está visível, motivo 2");
                    return;
                }
                button.addEventListener('click', function(event) {

                    log("Solicitando  para reexibir:click");
                    hideDiv();
                });
                startInspection();
            },1000);
        }

        function createToggleButton(){

            // Cria o botão de mostrar
            toggleButton = document.createElement('button');
            toggleButton.textContent = 'Mostrar campo de entrada';


            toggleButton.onclick = ()=>{
                showDiv();
            };
            toggleButton.classList.add("toggleButton");

            document.body.append(toggleButton);

        }


        // Função para mostrar o div e ocultar o botão
        function showDiv() {
            log("Reexibindo o campo de texto");
            if(toggleButton){
                toggleButton.style.display = 'none';
            }

            if (!mainDiv ) {
                error('Elementos não encontrados');

                return;
            }

            log("Ocultando botão");
            mainDiv.style.display = displayBefore;

            if (!alreadyHadEvent) {

                log("Solicitando pra reexibir o botão quando necessário");
                mainDiv.addEventListener('click', function(event) {
                    log("Identificando início de edição...");
                    createListeners();
                });
                alreadyHadEvent=true;

            }

        }

        function showToggle(){
            log("Exibindo o botão toggle" );
            //remove tudo antes pois todo o estilo estava a ser transferido pro atributo por conta do framework, e depois ficava valendo mais do que o que eu colocava, impedindo mudar o display
            toggleButton.removeAttribute('style');

            //estilo de posicao
            toggleButton.style.position = 'fixed';
            toggleButton.style.top = '100px';
            toggleButton.style.left = '100px';

            // Estilo base do botão
            toggleButton.style.backgroundColor = '#10a37f'; // cor de fundo
            toggleButton.style.color = '#ffffff'; // texto branco
            toggleButton.style.border = 'none';
            toggleButton.style.borderRadius = '9999px'; // totalmente arredondado
            toggleButton.style.padding = '10px 16px';
            toggleButton.style.fontSize = '14px';
            toggleButton.style.fontWeight = '600';
            toggleButton.style.fontFamily = 'system-ui, -apple-system, sans-serif';
            toggleButton.style.cursor = 'pointer';
            toggleButton.style.outline = 'none';
            toggleButton.style.transition = 'all 0.3s ease';
            toggleButton.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
            toggleButton.style.userSelect = 'none';
            toggleButton.style.whiteSpace = 'nowrap';
            toggleButton.style.display = 'visible';
        }


        // Função para ocultar o div e mostrar o botão
        function hideDiv() {

            fixSemantic();

            mainDiv= document.querySelector('.mainForm');

            if (!mainDiv ) {
                log('Elementos não encontrados');

                return;
            }


            log("Criando botão mostrar");

            if(!toggleButton)
            {
                createToggleButton();
            }

            showToggle();


            log("Ocultando o campo texto");

            displayBefore=mainDiv.style.display;
            mainDiv.style.display = "none";


        }

        handleIntern = setInterval(()=>{

            if(!terminate){
                hideDiv();
            }
            else
            {
                clearInterval(handleIntern);
            }
        },2000);

    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Verifica se o elemento foi re-adicionado
                mutation.addedNodes.forEach((node) => {
                    if (node.matches && node.matches('.isolate') ) {
                           cleanup();
                           all();

                    }
                });
            }
        });
    });

    // Observa o elemento pai
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });





    handle = setInterval(()=>{
        if(!terminate && !handleIntern){
            all();
        }
    },2000);



})();
