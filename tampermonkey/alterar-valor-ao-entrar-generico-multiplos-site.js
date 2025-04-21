// ==UserScript==
// @name         Alterador de Conteúdo DOM por Domínio
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Altera o conteúdo de elementos específicos baseado no domínio acessado
// @author       Você
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // MAPA DE DOMÍNIOS E SELEÇÕES - EDITÁVEL PELO USUÁRIO
    const DOMINIO_SELETORES = {
        // Exemplo para Google
        'www.google.com': {
            seletor: 'textarea[name="q"], input[name="q"]',
            conteudo: 'Pesquisa modificada por script Monkey'
        },
        // Exemplo para Twitter
        'twitter.com': {
            seletor: 'div[aria-label="Tweet text"]',
            conteudo: 'Tweet modificado por script Monkey'
        },
        // Exemplo para GitHub
        'github.com': {
            seletor: 'input[name="q"]',
            conteudo: 'Search GitHub modified'
        },
        // Padrão para outros sites (opcional)
        '*': {
            seletor: '#meu-elemento, .minha-classe',
            conteudo: 'Conteúdo padrão modificado'
        }
    };

    // Função principal que será executada
    function alterarElemento() {
        const dominio = window.location.hostname;
        const config = DOMINIO_SELETORES[dominio] || DOMINIO_SELETORES['*'];
        
        if (!config) {
            console.log('Nenhuma configuração definida para este domínio:', dominio);
            return;
        }

        const { seletor, conteudo } = config;
        const elementos = document.querySelectorAll(seletor);

        if (elementos.length > 0) {
            elementos.forEach(elemento => {
                if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
                    elemento.value = conteudo;
                    const event = new Event('input', { bubbles: true });
                    elemento.dispatchEvent(event);
                } else {
                    elemento.textContent = conteudo;
                }
                console.log('Elemento alterado:', elemento);
            });
        } else {
            console.warn('Elemento não encontrado com o seletor:', seletor, 'no domínio:', dominio);
        }
    }

    // Espera o DOM estar completamente carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', alterarElemento);
    } else {
        alterarElemento();
    }

    // Opcional: Observar mudanças dinâmicas no DOM (para SPAs)
    const observer = new MutationObserver(alterarElemento);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();