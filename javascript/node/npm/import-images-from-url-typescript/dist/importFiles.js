import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';
import * as readline from 'readline';
const PATH_DIR = "C:/Users/gandnegro/Downloads/livro";
function importImages(directoryPath) {
    try {
        const files = fs.readdirSync(directoryPath);
        const htmlFiles = files.filter((file) => file.toLowerCase().endsWith('.html'));
        if (htmlFiles.length === 0) {
            console.log('Nenhum arquivo .html encontrado.');
            return;
        }
        htmlFiles.forEach((file) => {
            importImagesFromFile(directoryPath, file);
        });
    }
    catch (err) {
        console.error(`Erro ao ler o diretório: ${err.message}`);
    }
}
function importImagesFromFile(dir, fileName) {
    const filePath = path.join(dir, fileName);
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err.message);
            return;
        }
        importImagesFromContent(data.toString(), fileName);
    });
}
function importImagesFromContent(content, fileNameOriginal) {
    const regex = /http[^"|']*/;
    const matches = content.match(regex);
    if (!matches) {
        console.log("Nenhuma url encontrada para este arquivo...");
        return;
    }
    matches.forEach((url) => {
        downloadImage(url, fileNameOriginal);
    });
}
function formatFilename(filename) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1)
        return filename.replace(/\./g, '_'); // sem extensão
    const nameWithoutExt = filename.substring(0, lastDotIndex);
    return nameWithoutExt.replace(/\./g, '_');
}
function downloadImage(imageUrl, fileNameOriginal) {
    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    const fileFolder = formatFilename(fileNameOriginal);
    const outDir = path.join(PATH_DIR, 'out', fileFolder);
    const filename = askUserNewName(imageUrl);
    const outPath = path.join(outDir, filename);
    // Cria o diretório "out" se não existir
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
    // Baixa a imagem
    const file = fs.createWriteStream(outPath);
    protocol.get(imageUrl, (response) => {
        if (response.statusCode === 200) {
            response.pipe(file);
            console.log(`Imagem salva em: ${outPath}`);
        }
        else {
            console.error(`Erro ao baixar imagem: ${response.statusCode}`);
            file.close();
            fs.unlinkSync(outPath);
        }
    }).on('error', (err) => {
        console.error(`Erro na requisição: ${err.message}`);
        file.close();
        fs.unlinkSync(outPath);
    });
}
function askUserNewName(urlString) {
    const parsedUrl = new URL(urlString);
    const filename = path.basename(parsedUrl.pathname);
    console.log(`Nome do arquivo da URL: ${filename}`);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let ret = "";
    rl.question('Digite algo: ', (answer) => {
        rl.close();
        ret = answer;
    });
    return ret;
}
