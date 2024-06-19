import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Agora você pode usar __dirname
const pathToSomeFile = join(__dirname, 'somefile.txt');
console.log(`O caminho para o arquivo é: ${pathToSomeFile}`);
