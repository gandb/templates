class StringsUtil {

    public contains(str: string, value: string): boolean {
        if (value.length > str.length) {
            return false;
        }

        return str.indexOf(value) >= 0;
    }

    public startsWith(str: string, value: string): boolean {
        if (value.length > str.length) {
            return false;
        }

        const part: string = this.left(str, value.length);

        return part === value;
    }

    public endsWith(str: string, value: string): boolean {
        if (value.length > str.length) {
            return false;
        }

        const part: string = this.right(str, value.length);

        return part === value;
    }
    public left(str: string, n: number): string {
        if (n <= 0) {
            return "";
        } else if (n > str.length) {
            return str;
        } else {
            return str.substring(0, n);
        }
    }

    public trim(str: string): string {
        return str.replace(/^\s*|\s*$/g, "");
    }

    public right(str: string, n: number): string {
        if (n <= 0) {
            return "";
        } else if (n > str.length) {
            return str;
        } else {
            const iLen: number = str.length;
            return str.substring(iLen, iLen - n);
        }
    }

    public repeat(str: string, n: number, separator: string): string {
        let ret = "";

        for (let index = 0; index < n; index++) {
            if (index > 0) {
                ret += separator;
            }
            ret += str;
        }

        return ret;
    }

    public leftPadding(str: string, n: number, paddingValue: string): string {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str = emptyBlock + str;
        return this.right(str, n);
    }

    public rightPadding(str: string, n: number, paddingValue: string): string {
        const emptyBlock = this.repeat(paddingValue, n, "");
        str += emptyBlock;
        return this.left(str, n);
    }

    public count(str: string, find: string): number {
        const arr: Array<string> = str.split(find);
        return arr.length - 1;
    }

    public hashNumber(str: string): number {
        let hashCode: number = 0;
        let i: number;
        let chr: number;

        if (str.length === 0) {
            return hashCode;
        }

        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            // tslint:disable-next-line
            hashCode = ((hashCode << 5) - hashCode) + chr;
            // tslint:disable-next-line
            hashCode |= 0; // Convert to 32bit integer
        }

        return hashCode;
    }

    public hashString(str: string): string {
        return this.hashNumber(str).toString(36);
    }


   public buildLetters(fullnames:Map<string,string>,size:number):Map<string,string>
   {
    
     let ret:Map<string,string> =  new Map();
     
     fullnames.forEach( (fullname,key,map)=>{
 
        let needSearchOtherLetter:boolean = true;

        let letter:string  = "" ;

        let tries:number = 1;

        let conflictName:string = "";

        while(needSearchOtherLetter)
        {
          letter =  this.buildLetter(fullname ,size,tries);

          needSearchOtherLetter = false;

          ret.forEach((value,key,map)=>{
            const conflict:boolean = value == letter;
            if(conflict)
            {
              needSearchOtherLetter = true;
              tries++;
              conflictName=value;
            }
            });
        }

        ret.set( key, letter);
    });

     return ret; 
   }

   public buildLetter(fullname:string , size:number, tries:number=1)
   {
        
    const maxtries : number = fullname.length + 9;
    if(maxtries< tries)
    {
        throw new Error("Cant create the letters without conflict");
    }

    if(fullname==null || fullname.trim().length==0)
    {
        console.error("Fulname cannot be empty " + fullname);
        throw new Error("Fulname cannot be empty " + fullname);
    }

    fullname = fullname.trim();


    let ret:string = "";
    let names:Array<string> = fullname.split(" ");

    let lastNameTried:number = names.length-1;

    let lastname = names[names.length-1];

    const maxStartLetterTries:number = names.length;

    let candidateTry :number = 1 ; 
 
    
    for(let name of names)
    {
       
        if(name.trim()!="" )
        { 
            const candidate: string =  name.substring(0,1).toUpperCase(); 
            const isntLastLetter:boolean =  ret.length < (size-1);
            if(candidateTry>=tries || isntLastLetter)
            {
                ret += candidate;
            }
            else{
                candidateTry++;
            }
            
        }


        if(ret.length==size)
        {
            break;
        }
    }

    if(ret.length==size)
    {
        
        return ret;
    } 
 
  
    while(ret.length<size && lastNameTried >= 0 && candidateTry < maxtries)
    { 

        let accumulativeSubLettesr:number = 0 ;
        
        if(lastname.length > 1)
        {
            let startIndex = 1;
           
            while (startIndex<lastname.length && candidateTry < maxtries && ret.length < size)
            {
                accumulativeSubLettesr++;
                const candidate: string =  lastname.substring(startIndex,startIndex+1).toUpperCase();
 
                if( candidateTry >= tries)
                {
                    ret += candidate;
                    startIndex++;
                }
                else
                {
                    startIndex++;
                    candidateTry++;
                }
            }

            const cantContinue:boolean = startIndex>=lastname.length && ret.length != size;
            if(cantContinue)
            {
                lastNameTried--; 
            }
           
        }
        else{
            lastNameTried--;
        }

        if(lastNameTried>= 0)
        {
            lastname = names[lastNameTried];
        }
        
    }

    
    if(ret.length==size)
    {
        
        return ret;
    } 
 
    
    let  index : number = 1 ;  
    while(ret.length < size &&  index < 10)
    {   
        const candidate: string =  index.toString();
        //accept 9 numbers
        
        if(candidateTry >= tries)
        {
            ret += candidate; 
            break;
        }
        else{
            candidateTry ++;
            index++;
        }  
    } 

    
    if(ret.length==size)
    {
        
        return ret;
    }

    if(ret.length<size)
    {
        throw new Error("Cant create the letters");
    }
  
    

    return ret;
     
   }

}

export { StringsUtil };
