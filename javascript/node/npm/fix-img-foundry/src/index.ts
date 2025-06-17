import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile,writeFile } from 'fs/promises';
import { promises as fs } from 'fs';
import * as path from 'path';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 

const WRONG_FILES: string[] = ["arquivos-errados-candlekeep-module.txt","arquivos-errados-ravenloft-f15.txt","arquivos-errados-ravenloft-module.txt"];
const DATA_PATH:string = "C:\\Users\\Public\\Portables\\Foundry\\Data\\modules";
 

let map  = [];

async function main() {

    let allLines:string[] = await getLines();  

    for (const line of allLines )
    {
        let file = extractFileName(line);

        file = replaceExtension(file,".webp"); 
    
        const pathFounded = await findFileRecursive(DATA_PATH,file);

        if(!pathFounded)
        {
             console.log("File ", file, " not founded!");
             continue;
        }

        map[map.length] = [file,pathFounded]; 
    }

    let code = "const mapChangeFiles =new Map( " + JSON.stringify(map) + " );";
    code = code.replaceAll(",[",",\n [");
    await writeFile("./code.js",code);
    console.log("The code was generated.");
}

try{
    await main();
}
catch (error) {
    console.error("Error in convert to array values",error);
    throw error;
}

function replaceExtension(fileName:string,extension:string):string{
    if(fileName.toLocaleLowerCase().indexOf(".webp")>0)
    {
        return fileName;
    }

    const lastIndexOf:number =  fileName.lastIndexOf(".");
    const fileNameFixed:string =  fileName.substring(0,lastIndexOf)+extension;

    return fileNameFixed;
}

function extractFileName(line:string):string{
    const firstMark:number =  line.indexOf("[");
    const lastMark:number = line.indexOf("]");

    let ret = line.substring(firstMark+1,lastMark);
    const markBar:number =  ret.lastIndexOf("/");
    ret = ret.substring(markBar+1);

    return ret;
}

async function getLines(): Promise<string[]> {
    let allContent:string = "";
    
    for ( const pathFile of WRONG_FILES)
    { 
            const content = await readFile(pathFile, { encoding: 'utf-8' });  
            console.log("Lines for " , pathFile, content.split("\n").length);
            allContent += (allContent.length==0) ?  content : "\n" + content;
    }
 
    return allContent.split("\n");
}

 
async function findFileRecursive(baseDir: string, targetFile: string): Promise<string | null> {

    const entries = await fs.readdir(baseDir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(baseDir, entry.name);

        if (entry.isFile() && entry.name === targetFile) {
            return fullPath;
        }

        if (entry.isDirectory()) {
            const result = await findFileRecursive(fullPath, targetFile);
            if (result) {
                return result;
            }
        }
    }
 
    return null;
}