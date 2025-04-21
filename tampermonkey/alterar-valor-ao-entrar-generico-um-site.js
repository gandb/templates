// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-04-19
// @description  try to take over the world!
// @author       You
// @match        https://chat.deepseek.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deepseek.com
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         Alterador de Conteúdo DOM
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Altera o conteúdo de um elemento específico quando a página carrega
// @author       Você
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // CONSTANTES - EDITÁVEIS PELO USUÁRIO
    const CSS_SELECTOR = '#meu-elemento'; // Seletor CSS do elemento a ser alterado
    const NOVO_CONTEUDO = 'Novo conteúdo inserido pelo script Monkey'; // Conteúdo a ser inserido

    // Função principal que será executada
    function alterarElemento() {
        // Encontra o elemento usando o seletor CSS
        const elemento = document.querySelector(CSS_SELECTOR);

        if (elemento) {
            // Verifica o tipo de elemento e altera o conteúdo apropriadamente
            if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
                // Para inputs e textareas, usamos value
                elemento.value = NOVO_CONTEUDO;
                
                // Dispara eventos de mudança para aplicações que usam listeners
                const event = new Event('input', { bubbles: true });
                elemento.dispatchEvent(event);
            } else {
                // Para outros elementos (div, span, p, etc.), usamos textContent ou innerHTML
                elemento.textContent = NOVO_CONTEUDO;
                // Alternativamente: elemento.innerHTML = NOVO_CONTEUDO;
            }

            console.log('Elemento alterado com sucesso:', elemento);
        } else {
            console.warn('Elemento não encontrado com o seletor:', CSS_SELECTOR);
        }
    }

    // Espera o DOM estar completamente carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', alterarElemento);
    } else {
        // DOM já está carregado, executa imediatamente
        alterarElemento();
    }
})();