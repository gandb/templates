export interface NodeList {
			show(): void;
			hide(): void;
			html(value:string): void;
		}

  

export class Monadic  
{
	readonly selector:string;


	constructor (selector:string|Element|Document) 
	{  

    this.selector = this.objToSelector(selector);
    this.selector=(this.selector==="")?"BODY":this.selector;
	}


  private objToSelector(selector:string|Element|Document) :string
  {
      if( typeof selector === "string")
      {
          return  <string>selector; 
      }


      if( selector === document)
      {
        return "";
      }
 
      const element : Element = <Element> selector; 

      let ix:number= 0;

      if(element==undefined || element.parentNode==null)
      {
        return "";
      }

      let thisPartialSelector = element.tagName;

      element.classList.forEach((className,index)=>{
         thisPartialSelector+="."+className;
      });
 
      let siblings= element.parentNode.childNodes;

      for (var i= 0; i<siblings.length; i++) {
        let sibling= siblings[i];
        if (sibling===element)
        {
           return this.objToSelector(<Element>element.parentNode) + ' ' + thisPartialSelector;
        }
      } 

      return "";
  }
 
  	public forEach(callbackfn:(value:Element,key:number, parent:NodeListOf<any>)=>void,thisArg?:any):void
  	{
  		return  document.querySelectorAll(this.selector).forEach(callbackfn,thisArg);
  	}

 
    public show():Monadic{
	    this.forEach(
	      (element,index)=>
	      {
	          element.classList.remove("monadic-hide"); 
	          
	      }
	    );
	    return this;
  }

  public hide():Monadic{
    this.forEach(
      function (element,index)
      {
          element.classList.add("monadic-hide"); 
      }
    );
    return this;
  }

  public html(value:string):Monadic{
    this.forEach(
      function (element,index)
      {
          element.innerHTML=value;
      }
    );
    return this;
  } 

  public onReady(callback:()=>void):void
  {
		  window.onload = callback;
  }

  public bind(event:string, callback:(e?:Event)=>void)
  {
      this.forEach( (element,index)=>{ element.addEventListener(event, callback)});
  }


  public addClass(className:string)
  {
      this.forEach( (element,index)=>{ element.classList.add(className)});
  }
 
}

export function builder(selector:string|Element|Document) :Monadic
{
	 return  new Monadic(selector);
} 