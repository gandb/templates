
https://semantic-ui-vue.github.io/#/

1-) Para instalar o semantic ui : 
 
#npm install semantic-ui-vue --save 
#npm install semantic-ui --save 

2-)  Adicionar no main.ts depois dos imports: 

...imports antigos
+// @ts-ignore
+import SuiVue from 'semantic-ui-vue';

E depois das configurações:

Vue.config.productionTip = false
+// @ts-ignore
+ Vue.use(SuiVue);


3-) Remova todos os arquivos que se referem a semantic da pasta raiz do projeto

4-) Para testar: 

#Na View:
<sui-button primary>click me</sui-button>
