

export enum GAME_SCREEN
{
  TP_NULL=-1,
  TP_FULLSCREEN_ANSWER =0,
  TP_LOAD =1,
  TP_SPLASH = 2,
  TP_PLAY  = 3
}


export default {
  state: { 
    hassplash:false,error:"",confirmationOnExit:false,
    needRedirectPages:["/subscription"],stateGame:GAME_SCREEN.TP_NULL,
    loadingGame:false 
  },
};