import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import isAdmin from 'is-admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, 'dist'); 


async function checkAdmin() {
  const elevated = await isAdmin();
  if (!elevated) {
    console.error('❌ Este script deve ser executado como administrador.');
    process.exit(1);
  }
}

// no início da build:
await checkAdmin();
// segue sua lógica de cópia aqui…

if (fs.existsSync(dirPath)) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true }); 
} else {
  console.log('A pasta "dist" não existe.');
}
