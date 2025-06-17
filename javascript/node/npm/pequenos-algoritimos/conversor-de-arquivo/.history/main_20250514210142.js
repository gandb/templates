const fs = require('fs');
const readline = require('readline');

// Caminhos dos arquivos
const inputFile = 'entrada.txt';
const outputFile = 'saida.txt';

// Cria interface para leitura linha a linha
const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity
});

// Apaga o conteúdo do arquivo de saída se já existir
fs.writeFileSync(outputFile, '');

// Função para extrair números e calcular média
function extrairMedia(linha) {
  const match = linha.match(/~?(\d+)[^\d]+~?(\d+)/);
  if (!match) return null;

  const num1 = parseInt(match[1], 10);
  const num2 = parseInt(match[2], 10);
  return ((num1 + num2) / 2).toFixed(2); // média com 2 casas decimais
}

// Processamento linha por linha
rl.on('line', (linha) => {
  const media = extrairMedia(linha);
  if (media !== null) {
    fs.appendFileSync(outputFile, `${media}\n`);
  }
});

rl.on('close', () => {
  console.log(`Arquivo "${outputFile}" criado com sucesso.`);
});
