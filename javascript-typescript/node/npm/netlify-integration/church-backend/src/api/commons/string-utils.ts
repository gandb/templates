

export function splitMessage(message: string): string[] {
    const middle = Math.floor(message.length / 2);
     
    let brokenValue = "\n"; 
    
    let splitIndex :number = getSplitIndex(message,brokenValue,middle);

    if(splitIndex==-1)
    {
        brokenValue = ".";
        splitIndex = getSplitIndex(message,brokenValue,middle);
    }
    if(splitIndex==-1)
    {
        brokenValue = ",";
        splitIndex = getSplitIndex(message,brokenValue,middle);
    }
    if(splitIndex==-1)
    {
        brokenValue = ";";
        splitIndex = getSplitIndex(message,brokenValue,middle);
    }
    if(splitIndex==-1)
    {
        brokenValue = " ";
        splitIndex = getSplitIndex(message,brokenValue,middle);
    }
    if (splitIndex === -1) {
        return [message, ''];
    }
    const firstPart = message.substring(0, splitIndex).trim();
    const secondPart = message.substring(splitIndex + 1).trim(); 
    
    return [firstPart+brokenValue, secondPart];
}

function getSplitIndex(message:string,brokenValue:string,middle:number):number{
    let splitIndex = message.lastIndexOf(brokenValue, middle);
     
    if (splitIndex === -1) {
        splitIndex = message.indexOf(brokenValue, middle);
    }
    return splitIndex;    
    
}