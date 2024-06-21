import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
const isFrontEnd = true;
// Servir arquivos estáticos da pasta 'public' 
app.use(express.static(path.join(__dirname.replace("dist", "."), 'public')));
// Rota padrão que carrega o 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/hello", async (req, res) => {
    res.send({ "text": "hello world" });
});
//app.use(`/xisto`, xisto);
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
