// ==UserScript==
// @name         Tradutor de EN para PT para IA de DND
// @namespace    http://tampermonkey.net/
// @version      0.0.4
// @description  Verifica seletores em diferentes plataformas de chat
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Mapa de domínios com seletor e conteúdo (não utilizado)
    const DOMINIO_CONFIG = {
        'chat.deepseek.com': {
            seletor: '#chat-input',
           conteudo: 'Traduza do inglês para o português brasileiro mantendo o contexto, estilo, os fontes de HTML e afins, além da terminologia característicos de Dungeons & Dragons 5ª Edição. Certifique-se de adaptar nomes de locais como Candlekeep, Sword of Coast etc, criaturas, magias, itens e termos técnicos para seus equivalentes oficiais ou mais amplamente reconhecidos no cenário de RPG. Preserve a imersão narrativa e qualquer nuance que seja essencial para o gênero de fantasia medieval.Não repita o que eu disse e nem diga mais nada, só coloque a tradução:'
        },
        'chatgpt.com': {
            seletor: '#prompt-textarea',
            conteudo: 'Traduza do inglês para o português brasileiro mantendo o contexto, estilo, os fontes de HTML e afins, além da terminologia característicos de Dungeons & Dragons 5ª Edição. Certifique-se de adaptar nomes de locais como Candlekeep, Sword of Coast etc, criaturas, magias, itens e termos técnicos para seus equivalentes oficiais ou mais amplamente reconhecidos no cenário de RPG. Preserve a imersão narrativa e qualquer nuance que seja essencial para o gênero de fantasia medieval.Não repita o que eu disse e nem diga mais nada, só coloque a tradução:'
        },
        'chat.qwen.ai': {
            seletor: '#chat-input',
            conteudo: 'Traduza do inglês para o português brasileiro mantendo o contexto, estilo, os fontes de HTML e afins, além da terminologia característicos de Dungeons & Dragons 5ª Edição. Certifique-se de adaptar nomes de locais como Candlekeep, Sword of Coast etc, criaturas, magias, itens e termos técnicos para seus equivalentes oficiais ou mais amplamente reconhecidos no cenário de RPG. Preserve a imersão narrativa e qualquer nuance que seja essencial para o gênero de fantasia medieval.Não repita o que eu disse e nem diga mais nada, só coloque a tradução:'
        },
        'gemini.google.com': {
            seletor: '#app-root rich-textarea > div.ql-editor.textarea.new-input-ui',
            conteudo: 'Traduza do inglês para o português brasileiro mantendo o contexto, estilo, os fontes de HTML e afins, além da terminologia característicos de Dungeons & Dragons 5ª Edição. Certifique-se de adaptar nomes de locais como Candlekeep, Sword of Coast etc, criaturas, magias, itens e termos técnicos para seus equivalentes oficiais ou mais amplamente reconhecidos no cenário de RPG. Preserve a imersão narrativa e qualquer nuance que seja essencial para o gênero de fantasia medieval.Não repita o que eu disse e nem diga mais nada, só coloque a tradução:'
        }
    };

    const MAX_ATTEMPTS = 10;
    const CHECK_INTERVAL = 500;

    function injectContent(element, content) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = content;
            // Dispara eventos para aplicações que monitoram mudanças
            const inputEvent = new Event('input', { bubbles: true });
            const changeEvent = new Event('change', { bubbles: true });
            element.dispatchEvent(inputEvent);
            element.dispatchEvent(changeEvent);
        } else if (element.isContentEditable) {
            element.innerHTML = content;
            const inputEvent = new Event('input', { bubbles: true });
            element.dispatchEvent(inputEvent);
        } else {
            element.textContent = content;
        }
        log('Conteúdo injetado com sucesso!');
    }

    function getTimestamp() {
        const now = new Date();
        const YYYY = now.getFullYear();
        const MM = String(now.getMonth() + 1).padStart(2, '0');
        const DD = String(now.getDate()).padStart(2, '0');
        const HH = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const SS = String(now.getSeconds()).padStart(2, '0');
        
        return `${YYYY}${MM}${DD}${HH}${mm}${SS} MONKEY SCRIPT TRANSLATE DND - `;
    }

    function warn(message,...args) {
        console.warn(getTimestamp() + message, ...args); 
    }

    function log(message,...args) {
        console.log(getTimestamp() + message, ...args); 
    }

    function checkSelector(attempt = 0) {
        const dominio = window.location.hostname;
        const config = DOMINIO_CONFIG[dominio];

        if (!config) {
            if (attempt === 0) { // Só mostra uma vez
                log(`ℹ️ Nenhuma configuração para o domínio: ${dominio}`);
            }
            return false;
        }

        const { seletor,conteudo } = config;  
        const element = document.querySelector(seletor);
        
        if (element) {
            log(`✅ [${dominio}] Elemento encontrado com seletor:`, seletor); 
              
            try {
                injectContent(element, conteudo);
                return true;
            } catch (error) {
                console.error('Erro ao injetar conteúdo:', error);
                return false;
            }
            return true;
        } else if (attempt < MAX_ATTEMPTS) {
            if (attempt === 0) {
                console.log(`🔍 [${dominio}] Verificando seletor:`, seletor);
            }
            setTimeout(() => checkSelector(attempt + 1), CHECK_INTERVAL);
        } else {
            warn(`❌ [${dominio}] Elemento não encontrado após ${MAX_ATTEMPTS} tentativas`);
            warn('Seletor:', seletor);
            return false;
        }
    }

    // Inicia a verificação
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            log('DOM carregado - iniciando verificação...');
            checkSelector();
        });
    } else {
        checkSelector();
    }

    // Verificação adicional para SPAs
    setTimeout(checkSelector, 3000);
})();