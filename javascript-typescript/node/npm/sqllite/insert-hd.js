const sqlite3 = require('sqlite3').verbose(); 
 

let db = null;
 

  (async ()=>{
    if(db!=null)
    {
        return;
    }
    console.log("Iniciando worker "  );
  
   // const dbTemp =  await AsyncDatabase.open(':memory:');
   let dbTemp = new sqlite3.Database('./db/characters2.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the file  SQlite database.');
  });
   //console.log("init:20");
    
    dbTemp.run(
      "CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, cod TEXT NOT NULL)"
    );
    //console.log("init:30");
  
    db = dbTemp;
  })();

    function  subInsert(verbose ){

        //lines with 100B
        const promise = new Promise((resolve,reject)=>{
            const sql = "INSERT INTO characters (name,cod)  VALUES ('kenzo','012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789')";  
            if(verbose)   console.log("worker:debug45",sql);
            db.run(sql,()=>{
                if(verbose)   console.log("Inserido! "); 
              resolve();
             }); 
        }) ;
       return promise;
  };

  function  subDump(verbose ){

    const startTimeWrite = performance.now();
    db.all("SELECT * FROM characters",(err, rows ) => {
        const timeRead =  performance.now()-startTimeWrite;
        console.log("time for reading " + rows.length + " lines is " ,(timeRead/(1000* rows.length )," per  line"));
    });

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
           await subInsert(verbose);
            if(verbose)        console.log("insert:debug40");
           
        },100);
    }
    else
    {
        if(verbose)    console.log("insert:debug21");
        await subInsert(verbose);
        if(verbose)    console.log("insert:debug31");
    }

return "Finalizado worker!"; 
  
};