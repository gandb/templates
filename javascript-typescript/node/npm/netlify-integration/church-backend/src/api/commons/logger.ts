import * as fs from 'fs';
import * as path from 'path';

export class Logguer{
    constructor(private filePath:string,fileName:string,private level:number=0,private useTimestamp:boolean=false)
    {
        if (useTimestamp)
        {
            this.filePath = path.join(this.filePath,this.timestamp(true) + fileName); 
            return;
        }
        this.filePath = path.join(this.filePath, fileName); 
        
    }

    private timestamp(short:boolean):string{

        const now:Date = new Date();
    
        const Y:number = now.getFullYear();
        const M:string = String(now.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const D:string = String(now.getDate()).padStart(2, '0');
        const H :string= String(now.getHours()).padStart(2, '0');
        const m:string = String(now.getMinutes()).padStart(2, '0');
        const s:string = String(now.getSeconds()).padStart(2, '0');
        const n:string = String(now.getMilliseconds()).padStart(3, '0');
    
        const timestamp:string = (short)?`${Y}${M}${D}-${H}${m}${s}`:`${Y}${M}${D}-${H}${m}${s}.${n}`;

        return timestamp;
    }

    log(...message:any) {
        const timestamp =  this.timestamp(false);
        
        this.toFile(`${timestamp} - ${message}\n`);
        
       
    }
    
    private toFile(message:string){
        fs.appendFile(this.filePath, message, (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
            }
        });
    }
    
}