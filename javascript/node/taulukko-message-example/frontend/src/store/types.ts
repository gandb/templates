 
export const TP_DM : number  = 0 ;

 export interface CharStateData{
  id:string,
  name:string,
  image:string,
  userid:string,
  age:number,
  weight:string,
  height:string,
  inventory:string,
  skills:string,
  level:number,
  xp:number,
  nextlevel:number,
  hp:number,
  maxhp:number,
  selected:boolean,
  tokentext:string,
  tokencolorindex:number
};
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

export enum GAME_SCREEN
{
  TP_NULL=-1,
  TP_FULLSCREEN_ANSWER =0,
  TP_LOAD =1,
  TP_SPLASH = 2,
  TP_PLAY  = 3
}

export interface UserGameStateData{
  id:string,
  name:string,
  image:string,
  charid:string,
  accesslevel:number,
  isgm:boolean
};

export interface CharStateData{
  id:string,
  name:string,
  image:string,
  userid:string,
  age:number,
  weight:string,
  height:string,
  inventory:string,
  skills:string,
  level:number,
  xp:number,
  nextlevel:number,
  hp:number,
  maxhp:number,
  selected:boolean,
  tokentext:string,
  tokencolorindex:number
};


export interface ChatMessageStateData
{ 
      id:string;
      charid:string;
      name:string; 
      status:string;
      message:string
      created:Date;
      tokentext:string;
      tokencolorindex:number;
}

export interface UserStateData
{ 
  logged:boolean, // TODO : tem codigo usando indiretamente
  accesslevel:number,
  image:string, 
  name:string,
  self:string,
  allcampaigns:Array<any>,
  campaignsiown:Array<any>,
  id:string,
  data:any
}

export interface GameStateData
{ 
  cmpid:string,
  gmid:string,
  users:Array<UserGameStateData>,
  chars:Array<CharStateData>,
  chat:ChatStateData,
  subscreen:number,
  taulukkoToken:string
}

export interface ChatStateData
{ 
  messages:Array<ChatMessageStateData>;
}

export enum GAME_SUB_SCREEN
{
  TP_NULL=0,
  TP_CONFIG_PAGE =101,
  TP_CREDIT_PAGE =102,
  TP_SOUND_PAGE = 103,
  TP_REMOVE_PLAYER_PAGE = 104,
  TP_MAIN_PAGE  = 1
} 


export interface StateVuexTaulukko{
  constants: {DEFAULT_IMAGE : string  },
  subscribers   : {dungeonLords: Array<string>},
  user:UserStateData,
  //TODO: remover o portraits, era somente para testar
  portraits:{count:number,data:Array<any>},
  device:{mobile:boolean,shortcuts:Map<string,Shortcut>, 
    keyboardvisible:boolean,
    onresize:Map<string,Function>, fullscreen:boolean,
    audio:{
      enabledEffects:boolean,
      enabledMusic:boolean,
      enabledMessage:boolean
    }},
  game:GameStateData|null,
  sandbox:{mobile:boolean,active:boolean},
  chat:{
    splash:{
      start:boolean,
      end:boolean
    }
  },
  application:{hassplash:boolean,error:string, stateGame:number,
    confirmationOnExit:boolean,needRedirectPages:Array<string>,loadingGame:boolean}
}