 
import fs from 'fs';

export function createFSHandler(name,path)
{
    if(path.substring(path.length-1,path.length)!="/")
    {
        path+="/";
    }
    if(path.substring(0,1)!="/" || path.length==1)
    {
        if( path.length==1)
        {
            path="."+path;
        }
        else
        {
            path="./"+path;
        }
    }
    
    if(!fs.existsSync(path))
    {
        throw new Error("Path [" + path + "] not exist");
    }
    
    return { save : (x)=>{  
        fs.writeFile(path +  name + '.json', JSON.stringify(x), (err) => {
            if (err) throw err; 
        });
        const typedArray = new Uint8Array(x.weightData);
        const array = [...typedArray];
        fs.writeFile(path + name + '-data.json',  JSON.stringify(array), (err) => {
            if (err) throw err; 
        });
    },
    load: ()=>{ 
        const data = JSON.parse(  fs.readFileSync(path + name + '.json', 'utf8'));
        const array = JSON.parse(  fs.readFileSync(path + name + '-data.json', 'utf8'));

        let arrayBuffer = new Uint8Array(array).buffer;
        data.weightData = arrayBuffer;
        return data;

    },
    exist: ()=>{ 
       return fs.existsSync(path + name + '.json') ;
    }};
    }; 