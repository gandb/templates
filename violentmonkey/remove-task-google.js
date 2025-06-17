// ==UserScript==
// @name         Removedor de Task do GMAIL
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove a funcionalidade de task do site
// @author       Edson Carli
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
	
	 
	 var task = false;

	 function log(...args){
		 console.log("RTGMAIL:",...args);
	 }
	 
	 function removeTask(){
		  
		 const elementos = document.querySelectorAll('div[data-tooltip="Adicionar ao Tarefas"]');
		 task = (elementos?.length >0) ? elementos[0]:false;
		 if(!task){
			setTimeout(removeTask,1000);	 
		 }
		 log("task encontrada",task);  
		 task.remove();
		 setTimeout(removeTask,1000);
	 }

	 log("Removedor de Task do GMAIL iniciando...");
     removeTask(); 
})();