  
import * as fs from 'fs';
import * as path from 'path'; 
import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';  
import * as readline from 'readline';


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
    
    for(let i = 0; i < htmlFiles.length; i++){
      const file:string = htmlFiles[i];
      
      prepareOutputDir(directoryPath,file);

      await importImagesFromFile(directoryPath,file).catch( (err)=> console.error(`Erro ao ler o arquivo ${file}: ${err.message}`));
    }
  } catch (err) {
    console.error(`Erro ao ler o diretório: ${err.message}`);
  }
}

 
async function importImagesFromFile(dir: string, fileName: string):  Promise< void>  {
  const ret:Promise<void> = new Promise((resolve,reject) => {
    try {
      const filePath = path.join(dir, fileName);

      fs.readFile(filePath, 'utf-8',async  (err, data) => {
       
        if (err) {
          reject(err);
          return;
        }
        console.log(`Lendo o arquivo: ${fileName}`);
        await importImagesFromContent(data.toString(),fileName); 
        resolve();
      });
     
    } catch (error) {
      reject(error);
    }
  });
  return ret;
}

async function importImagesFromContent(content: string,fileNameOriginal:string):  Promise< void>  {
	const regex = /http[^"|']*/g; 
	const matches = content.match(regex);

	if (!matches) {
	  console.log("Nenhuma url encontrada para este arquivo...");
    return;
	}
  const fileFolder:string =  formatFilename(fileNameOriginal);
  const outDir = path.join(PATH_DIR, 'out');
  const outDirFile = path.join(outDir, fileFolder);
  

  for(let i = 0; i < matches.length; i++){
    const filename = await askUserNewName(fileNameOriginal);
    const outPath = path.join(outDirFile, filename);
    console.log(`Criando o arquivo: ${outPath}`);
    const url = matches[i]; 
    await downloadImage(url,outPath); 
	};
 

  console.log("Lista das urls encontradas:");
  for(let i = 0; i < matches.length; i++){
    const url = matches[i]; 
	  console.log(url);
	};
     
}

  function formatFilename(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) return filename.replace(/\./g, '_'); // sem extensão

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
      
      console.log(`URL [${urlString}] é uma imagem: ${ret}`);
      return ret;
  }

  async function  downloadImage(imageUrl: string, outPath:string ): Promise< void> {
    
    if(!isImage(imageUrl)) {
      console.log(`URL não é uma imagem: ${imageUrl}`); 
      return;
    }
    else{
      console.log(`URL é uma imagem: [${imageUrl}]`);
    }
  
    const fileoutput:fs.WriteStream = fs.createWriteStream(outPath);
    
    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http; 

 
    const ret:Promise<void> = new Promise((resolve,reject) => {   
    
      protocol.get(imageUrl, (response) => {
        if (response.statusCode === 200) {
          response.pipe(fileoutput as any );   
          fileoutput.on('finish', () => {
            fileoutput.close(); // opcional, mas recomendado
            resolve();
          }); 

              
          fileoutput.on('error', (err) => {
            fs.unlinkSync(outPath); // apaga arquivo incompleto
            reject(`Erro ao escrever o arquivo: ${err.message}`);
          });
          return;
        } 
        response.resume(); // consome o stream para evitar vazamento de memória
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
     
  async function askUserNewName(filename: string): Promise<string> {
        console.log(`Nome do arquivo da URL: ${filename}`);
        /*
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question('Digite novo nome para o arquivo: ', (answer) => {
          resolve(answer);
          rl.close();
        }); 
        */
        return "teste"+(++teste)+".webp"; //teste 
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