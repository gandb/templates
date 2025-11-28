

export function createHandler(name:string,path:string)
{

    return { save : (x:any)=>{
      window.localStorage.setItem(path+name+"model", JSON.stringify(x));
      const typedArray = new Uint8Array(x.weightData);
      const array = [...typedArray];
      window.localStorage.setItem(path+name+"data", JSON.stringify(array));
    },
    load: ()=>{
        const data =  JSON.parse(  window.localStorage.getItem(path+name+"model") as string);
        const array = JSON.parse(  window.localStorage.getItem(path+name+"data") as string);
        let arrayBuffer = new Uint8Array(array).buffer;
        data.weightData = arrayBuffer;
        return data;

    },
    exist: ()=>{
       return  window.localStorage.getItem(path+name+"model")!=null ;
    }};
    };
