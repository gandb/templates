import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';
import * as readline from 'readline';
const PATH_DIR = "C:/Users/gandnegro/Downloads/livro";
async function importImages(directoryPath) {
    try {
        removeOutputDir(directoryPath);
        const files = fs.readdirSync(directoryPath);
        const htmlFiles = files.filter((file) => file.toLowerCase().endsWith('.html'));
        if (htmlFiles.length === 0) {
            console.log('Nenhum arquivo .html encontrado.');
            return;
        }
        const mapUrlWithUrlToFileDataValues = [];
        for (let i = 0; i < htmlFiles.length; i++) {
            const originalFile = htmlFiles[i];
            prepareOutputDir(directoryPath, originalFile);
            const data = await importImagesFromFile(directoryPath, originalFile);
            const importData = { originalFile, data };
            mapUrlWithUrlToFileDataValues.push(importData);
        }
        for (let i = 0; i < mapUrlWithUrlToFileDataValues.length; i++) {
            const importData = mapUrlWithUrlToFileDataValues[i];
            if (importData && importData.data && importData.data.length == 0) {
                continue;
            }
            console.log(`Arquivos processados  : ${importData.originalFile}`);
            for (let j = 0; j < importData.data.length; j++) {
                const urlToFileData = importData.data[j];
                console.log(`Url Original: ${urlToFileData.url}`);
                console.log(`File name: ${urlToFileData.fileName}`);
            }
            console.log(`====================================================`);
        }
    }
    catch (err) {
        console.error(`Erro ao ler o diretório: ${err.message}`);
    }
}
async function importImagesFromFile(dir, fileName) {
    const ret = new Promise((resolve, reject) => {
        try {
            const filePath = path.join(dir, fileName);
            fs.readFile(filePath, 'utf-8', async (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const importsFromUrl = await importImagesFromContent(data.toString(), fileName);
                resolve(importsFromUrl);
            });
        }
        catch (error) {
            reject(error);
        }
    });
    return ret;
}
async function importImagesFromContent(content, fileNameOriginal) {
    const ret = [];
    const regex = /http[^"|']*/g;
    const matches = content.match(regex);
    if (!matches) {
        console.log("Nenhuma url encontrada para este arquivo...");
        return ret;
    }
    const fileFolder = formatFilename(fileNameOriginal);
    const outDir = path.join(PATH_DIR, 'out');
    const outDirFile = path.join(outDir, fileFolder);
    for (let i = 0; i < matches.length; i++) {
        const url = matches[i];
        if (!isImage(url)) {
            continue;
        }
        const fileName = await askUserNewName(url);
        const outPath = path.join(outDirFile, fileName);
        await downloadImage(url, outPath);
        const urlToFileData = { fileName, url };
        ret.push(urlToFileData);
    }
    ;
    return ret;
}
function formatFilename(filename) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1)
        return filename.replace(/\./g, '_');
    const nameWithoutExt = filename.substring(0, lastDotIndex);
    return nameWithoutExt.replace(/\./g, '_');
}
function isImage(urlString) {
    const images = [
        'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg', 'ico', 'jfif', 'heif', 'raw', 'avif'
    ];
    let ret = false;
    for (let i = 0; i < images.length; i++) {
        const ext = images[i];
        if (urlString.toLowerCase().endsWith("." + ext)) {
            ret = true;
            break;
        }
    }
    return ret;
}
async function downloadImage(imageUrl, outPath) {
    const fileoutput = fs.createWriteStream(outPath);
    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    const ret = new Promise((resolve, reject) => {
        protocol.get(imageUrl, (response) => {
            if (response.statusCode === 200) {
                response.pipe(fileoutput);
                fileoutput.on('finish', () => {
                    fileoutput.close();
                    resolve();
                });
                fileoutput.on('error', (err) => {
                    fs.unlinkSync(outPath);
                    reject(`Erro ao escrever o arquivo: ${err.message}`);
                });
                return;
            }
            response.resume();
            reject(`Erro ao baixar imagem: ${imageUrl}, erro ${response.statusCode}`);
            return;
        }).on('error', (err) => {
            console.error(`Erro na requisição: ${err.message}`);
            fs.unlinkSync(outPath);
            fileoutput.close();
            reject(`Erro ao baixar imagem: ${imageUrl}, erro ${err.message}`);
            return;
        });
    });
    return ret;
}
let teste = 0;
async function askUserNewName(url) {
    const ret = new Promise((resolve, reject) => {
        try {
            console.log(`Nome do arquivo da URL: ${url}`);
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Digite novo nome para o arquivo: ', (answer) => {
                rl.close();
                if (answer == null || answer.trim().length == 0) {
                    const fileName = extractFileName(url);
                    resolve(fileName.trim());
                    return;
                }
                resolve(answer.trim());
            });
        }
        catch (err) {
            console.error(`Erro ao perguntar o nome do arquivo: ${err.message}`);
            reject(err);
        }
    });
    return ret;
}
function removeOutputDir(directoryPath) {
    const outDir = path.join(directoryPath, 'out');
    fs.rmSync(outDir, { recursive: true, force: true });
    console.log(`Removendo o diretório: ${outDir}`);
    return;
}
function prepareOutputDir(directoryPath, filename = "") {
    const outDir = path.join(directoryPath, 'out');
    if (filename) {
        const fileFolder = formatFilename(filename);
        const outDirFiles = path.join(outDir, fileFolder);
        fs.mkdirSync(outDirFiles, { recursive: true });
        console.log(`Criando o diretório: ${outDirFiles}`);
        return;
    }
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`Criando o diretório: ${outDir}`);
    return;
}
importImages(PATH_DIR).then(() => {
    console.log('Importação de imagens concluída!');
}).catch((err) => {
    console.error(`Erro na importação de imagens: ${err.message}`);
});
function extractFileName(filename) {
    const lastSlashIndex = filename.lastIndexOf('/');
    const lastBackslashIndex = filename.lastIndexOf('\\');
    const startIndex = Math.max(lastSlashIndex, lastBackslashIndex) + 1;
    const ret = filename.substring(startIndex);
    return ret;
}
