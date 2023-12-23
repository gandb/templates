const sqlite3 = require('sqlite3').verbose(); 
 

const db = require('better-sqlite3')(':memory:');
 

console.log("Iniciando worker "  );
  
//console.log("init:20"); 
db.exec('CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, cod TEXT NOT NULL)');


process.on('exit', () => db.close());
  
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));



   function   subInsert(verbose ){

      const character = {name:'kenzo',cod:'012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'};

      const insertPrepare = db.prepare('INSERT INTO characters (name, cod) VALUES (@name, @cod)');
            
      const dispatch = db.transaction((char)=>{
        insertPrepare.run(char);
      }); 

      return dispatch(character); 
  };

  function  subDump(verbose ){

    const startTimeWrite = performance.now();
    const stmt = db.prepare('SELECT * FROM characters');
    const characters = stmt.all();
   
    const timeRead =  performance.now()-startTimeWrite;
    const total = timeRead/(1000* characters.length) ;
    console.log("time for reading " + characters.length + " lines is " ,total,"s per  line");
  
};


  module.exports =  async function insert(verbose,dump) {

    if(dump)
    {
        await subDump(); 
        return ;
    }

    
  if(verbose)  console.log("insert:debug10");
    if(db==null)
    {
        if(verbose)  console.log("insert:debug20");
        setTimeout(async ()=>{
            if(verbose)     console.log("insert:debug30");
             subInsert(verbose);
            if(verbose)        console.log("insert:debug40");
           
        },100);
    }
    else
    {
        if(verbose)    console.log("insert:debug21");
          subInsert(verbose);
        if(verbose)    console.log("insert:debug31");
    }

return "Finalizado worker!"; 
  
};