 
 (function(){
	 console.log("FixBadMigrationWarnings 1.0");

	 const warns = ["dnd5eactivity000","injectHeaderDataButtonV2"];
	 const errors = ["injectHeaderDataButtonV2"];
	//PARTE 1 - Corrigir erros relativos a problemas sem solução
	const originallog  = logger.warn;

	logger.warn = function(txt) {
		const firstArg = arguments[0].toString(); 

		let problemWithoutSolution = false;
	   
		for (let i = 0; i < warns.length; i++) {
		  if (firstArg.indexOf(warns[i]) >= 0) {
			  problemWithoutSolution = true;
		  }
		}
		  
		if( problemWithoutSolution)
		{
		  return;
		} 
		originallog.apply(logger, arguments);
	}    


	logger.error = function(txt) {
		const firstArg = arguments[0].toString(); 

		let problemWithoutSolution = false;
	   
		for (let i = 0; i < errors.length; i++) {
		  if (firstArg.indexOf(errors[i]) >= 0) {
			  problemWithoutSolution = true;
		  }
		}
		  
		if( problemWithoutSolution)
		{
		  return;
		}
		console.log("FixBadMigrationWarnings: " + txt);
		originallog.apply(logger, arguments);
	}    
})();