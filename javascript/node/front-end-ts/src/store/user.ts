 
export default {
  state: { 
    id:"",logged:false,accesslevel:100,image:"",name:"",self:"",
    campaignsiown:new Array<any>(),allcampaigns:new Array<any>()
  },
  getters:{
    image(state:any):string
    {
      if(state.user.image)
      {
          return state.user.image;
      }
      return state.constants.DEFAULT_IMAGE;
    }, 
  }
};