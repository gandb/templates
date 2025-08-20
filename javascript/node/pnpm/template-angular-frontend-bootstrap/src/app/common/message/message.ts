import { MessageType } from "./message-type";
import { KeyTool } from "taulukko-commons";

export interface IMessage{
    id:string,
    name:string,
    text:string,
    duration?:number,
    iconText:string,
    type:MessageType
}

export class Message implements IMessage{
    id: string;
    text: string;
    duration?: number;
    typeValue: MessageType;
    private iconTextValue:string="";
    private nameValue:string;

    public constructor(text:string,duration:number, type:MessageType = MessageType.info, iconText:string=""){
        this.text=text;
        this.duration=duration;
        this.typeValue=type; 
        this.nameValue = MessageType[type]; 
        this.id = new KeyTool().build(1,1); 
      
        if(iconText.length==0)
        {
            this.iconText = Message.defaultIconText(this,type);
            return;
        }
        this.iconText = iconText;
    }

     static defaultIconText(message:Message, type:MessageType ): string {
            switch(message.type){
            case MessageType.error:
                return   "❌&#26A0;🚫" ;
            case MessageType.warn: 
                return "⚠️"  ;
            case MessageType.success:
                return "✅";
            case MessageType.info:
                return "📌ℹ&#9432;&#xf167;&#8505;&#128712;";
            default:
                throw new Error("Type not supported");
        }
    }

    public get name():string{
        return this.nameValue;
    }

    public get iconText():string{
        return this.iconTextValue;
    }
    
    private set iconText(value:string){
        this.iconTextValue = value;
    }

    public get type():MessageType{
        return this.typeValue;
    }
    
    public setTypeAndIconText(type:MessageType, iconText:string=""){
        this.typeValue = type;
        if(iconText.length==0)
        {
            this.iconText = Message.defaultIconText(this,type);
            return;
        }
        this.iconTextValue = iconText;
    }
}
