https://vuetifyjs.com/pt-BR/getting-started/quick-start

1-) Para adicionar o plugin vuetify a um projeto, basta :
#vue add vuetify

2-) Compatibilize com o TS. Verifique se está adicionado no arquivo ts config a opção abaixo:

"compilerOptions": {
    "types": ["vuetify"],
 

 OBSERVACOES: Esse plugin se mostrou instável nos testes, mostrando não compatível com TS sem a alteração acima e não compatível com TSLint, pode não ser compatível com outras configurações também.

 Recomendo usar o semantic-ui.
 