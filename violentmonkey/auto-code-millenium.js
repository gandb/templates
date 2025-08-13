// ==UserScript==
// @name        Millenium - Add user
// @namespace   Violentmonkey Scripts
// @match       https://*/**
// @grant       none
// @version     1.6
// @author      -
// @description 07/05/2025, 15:29:43
// ==/UserScript==


const CODIGO_UTILIZADOR = 'FVCJ120704';

console.log("Iniciando Millenium Add user");



var intervalo=null;



function criarLembrete(){
      const lembrete = document.createElement('div');
      lembrete.id = 'meu-elemento';
      lembrete.textContent = 'Conteúdo dinâmico';
      lembrete.style.position = 'absolute';
      lembrete.style.top = '0px';
      lembrete.style.right = '0px';
      lembrete.style.padding = '8px';
      lembrete.style.zIndex = '9999';

      const mensagemHTML = `
      <div style="
        position: fixed;
        top: 10px;
        left: 10px;
        background: linear-gradient(135deg, #4e54c8, #8f94fb);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        font-family: sans-serif;
        font-size: 16px;
        z-index: 9999;
      ">
      ⚠️ A senha tem 8 dígitos : 0******0
      </div>
      `;
      lembrete.innerHTML = mensagemHTML;


      document.body.append(lembrete);

    }

(function() {
    'use strict';

     console.log("Iniciando Millenium Add user");

    // Função para verificar se o campo está visível e preencher
    function preencherCampoQuandoVisivel() {

        let iUserCode = document.getElementById('inptCode');

      if(!iUserCode)
        {
          iUserCode = document.getElementById('TextBoxLogin_txField');

        }

        // Verificar se o campo existe e está visível
        if (iUserCode && iUserCode.offsetParent !== null) {
            console.log("Campo encontrado....");
            iUserCode.value = CODIGO_UTILIZADOR;
            criarLembrete();
            clearInterval(intervalo); // Parar o intervalo quando o campo for preenchido
        }



    }

    // Intervalo para verificar a cada 500ms
    intervalo = setInterval(preencherCampoQuandoVisivel, 500);
})();
