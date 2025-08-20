export class PathUtils{

    public static join(a:string="",b:string="",c:string="",d:string="",e:string="" ):string{
        return PathUtils.removeSeparator( a) + PathUtils.generateSeparatorPrevious( b) +
        PathUtils.generateSeparatorPrevious(c) + PathUtils.generateSeparatorPrevious( d) +
        PathUtils.generateSeparatorPrevious( e);
    }

    
    private static generateSeparatorPrevious(part:string):string{
        if(!part){
            return "";
        }
        return "/" + PathUtils.removeSeparator( part);
    }

    private static removeSeparator(part:string):string{ 
        if(part.startsWith("/")){
            part = part.substring(1);
        }
        if(part.endsWith("/")){
            part = part.substring(0,part.length-1);
        }
        return part;
    }
}
 