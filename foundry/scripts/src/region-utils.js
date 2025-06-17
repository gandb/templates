
 
Hooks.on("ready",   () => {
  console.log("Loading Region Utils V1.0");
  
	document.regionUtils = {
		sendMessageToChat : (senderid,message)=>{
		
		// create the message
		const chatData = {
		  user: senderid,
		  speaker: "Game Master",
		  content: message,
		  whisper: game.users.filter((u) => u.isGM).map((u) => u._id),
		};
		ChatMessage.create(chatData, {});
	},

	 moveTokenTo : (token,x,y)=>{
		const newX = x* canvas.grid.size;  
		const newY =   y*canvas.grid.size; 

		token.x = newX;
		token.y = newY;
	 
		token.update({ x: newX , y: newY }) ;
	 
	}
	
	};
	 
	  
 });
 
