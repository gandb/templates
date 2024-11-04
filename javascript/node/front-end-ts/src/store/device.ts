

export interface ShortcutEvent{
  id:string;
  event:KeyboardEvent
};

export interface Shortcut{
  altKey:boolean;
  key:number;
  callback: (e:ShortcutEvent)=>void;
  id:string;
};

export default {
  state: { 
    mobile:false,shortcuts: new Map<string,Shortcut>() ,
      onresize: new Map<string,Function>(),fullscreen:false,
       keyboardvisible:false,
    audio:{
      enabledEffects:true,
      enabledMusic:true,
      enabledMessage:true
    },
  },
};