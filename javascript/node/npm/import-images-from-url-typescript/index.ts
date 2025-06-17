  
import * as fs from 'fs';
import * as path from 'path'; 
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';  
import * as readline from 'readline';
import { UrlToFileData } from './urlToFileData';
import { ImportData } from './importData';


const PATH_DIR = "C:/Users/gandnegro/Downloads/livro";


async function importImages(directoryPath: string): Promise<void> {
  try {


    removeOutputDir(directoryPath);
 

    const files = fs.readdirSync(directoryPath);

    const htmlFiles = files.filter((file) =>
      file.toLowerCase().endsWith('.html')
    );

    if (htmlFiles.length === 0) {
      console.log('Nenhum arquivo .html encontrado.');
      return;
    } 
    
    const mapUrlWithUrlToFileDataValues:Array<ImportData>  = [];

   

    for(let i = 0; i < htmlFiles.length; i++){
      const originalFile:string = htmlFiles[i];
      
      prepareOutputDir(directoryPath,originalFile);
 
      const data:Array<UrlToFileData> = await importImagesFromFile(directoryPath,originalFile);
      
      const importData:ImportData = {originalFile, data};

      mapUrlWithUrlToFileDataValues.push(importData);

    }

    console.log(`====================LOG================================`);

    for(let i = 0; i < mapUrlWithUrlToFileDataValues.length; i++){
      const importData:ImportData = mapUrlWithUrlToFileDataValues[i];
      if(importData && importData.data && importData.data.length==0){
        continue;
      } 
      console.log(`Arquivos processados  : ${importData.originalFile}`);
      for(let j = 0; j < importData.data.length; j++){
        const urlToFileData:UrlToFileData = importData.data[j];
        console.log(`Url Original: ${urlToFileData.url}`);
        console.log(`File name: ${urlToFileData.fileName}`);
      }
      console.log(`====================================================`);
    }
    console.log(`====================FIM DE LOG================================`);
  } catch (err) {
    console.error(`Erro ao ler o diretório: ${err.message}`);
  }
}

 
async function importImagesFromFile(dir: string, fileName: string):  Promise< Array<UrlToFileData>>  {
  const ret:Promise<Array<UrlToFileData>> = new Promise((resolve,reject) => {
    try {
      const filePath = path.join(dir, fileName);

      fs.readFile(filePath, 'utf-8',async  (err, data) => {
       
        if (err) {
          reject(err);
          return;
        }

        const importsFromUrl: Array<UrlToFileData> = await importImagesFromContent(data.toString(),fileName); 
        resolve(importsFromUrl);
      });
     
    } catch (error) {
      reject(error);
    }
  });
  return ret;
}

async function importImagesFromContent(content: string,fileNameOriginal:string):  Promise< Array<UrlToFileData>>  {
	
  const ret:Array<UrlToFileData> = [];

  const regex = /http[^"|']*/g; 
	const matches = content.match(regex);


	if (!matches) {
	  console.log("Nenhuma url encontrada para este arquivo...");
    return ret;
	}
  const fileFolder:string =  formatFilename(fileNameOriginal);
  const outDir = path.join(PATH_DIR, 'out');
  const outDirFile = path.join(outDir, fileFolder);
  

  for(let i = 0; i < matches.length; i++){
    const url = matches[i]; 
    if(!isImage(url)) { 
      continue;
    }
     
    const fileName = await askUserNewName(url); 
    const outPath = path.join(outDirFile, fileName); 
   
    await downloadImage(url,outPath); 

    const urlToFileData:UrlToFileData = {fileName,url};

    ret.push(urlToFileData);
	};

  return ret;
     
}

  function formatFilename(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return filename.replace(/\./g, '_');

    const nameWithoutExt = filename.substring(0, lastDotIndex);
    return nameWithoutExt.replace(/\./g, '_');
  }

    function isImage(urlString: string):  boolean {
      const images:Array<string> = [
        'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg', 'ico', 'jfif', 'heif', 'raw', 'avif'
      ];

      let ret:boolean = false;
      for(let i = 0; i < images.length; i++){
        const ext:string = images[i];
        if(urlString.toLowerCase().endsWith("."+ext)){
          ret = true;
          break;
        }
      } 
 
      return ret;
  }

  async function  downloadImage(imageUrl: string, outPath:string ): Promise< void> {
  
    const fileoutput:fs.WriteStream = fs.createWriteStream(outPath);
    
    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http; 

 
    const ret:Promise<void> = new Promise((resolve,reject) => {   
    
      protocol.get(imageUrl, (response) => {
        if (response.statusCode === 200) {
          response.pipe(fileoutput as any );   
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

  let teste:number = 0; 
     
  async function askUserNewName(url: string): Promise<string> {
      const ret:Promise<string> = new Promise((resolve,reject) => {

        try{
          console.log(`Nome do arquivo da URL: ${url}`);
      
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });

          rl.question('Digite novo nome para o arquivo: ', (answer) => {
            rl.close(); 
            if(answer==null || answer.trim().length==0){        
              const fileName:string = extractFileName(url); 
              resolve(fileName.trim());
              return;
            }
            resolve(answer.trim());
          });  
        } catch(err){
          console.error(`Erro ao perguntar o nome do arquivo: ${err.message}`);
          reject(err);
        }

      });

      return ret;
}

function removeOutputDir(directoryPath: string): void {
  const outDir:string = path.join(directoryPath, 'out');
  (fs as any).rmSync(outDir, { recursive: true, force: true });
  console.log(`Removendo o diretório: ${outDir}`);
  return;
}

function prepareOutputDir(directoryPath: string,filename:string=""): void {
  const outDir:string = path.join(directoryPath, 'out'); 

  if(filename)
  {
    const fileFolder:string =  formatFilename(filename);
    const outDirFiles:string = path.join(outDir, fileFolder);
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
} );

function extractFileName(filename: string): string { 
  const lastSlashIndex = filename.lastIndexOf('/');
  const lastBackslashIndex = filename.lastIndexOf('\\');
  const startIndex = Math.max(lastSlashIndex, lastBackslashIndex) + 1;
  const ret =  filename.substring(startIndex); 
  return ret;
}
