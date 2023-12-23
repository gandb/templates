const sqlite3 = require('sqlite3').verbose();

//usando a api async
const { AsyncDatabase } = require("promised-sqlite3"); 

const WorkerNodes = require('worker-nodes');
const insertWorkerMemory = new WorkerNodes(require.resolve('./insert'),{maxWorkers :1});
const insertWorkerHD = new WorkerNodes(require.resolve('./insert-hd'),{maxWorkers :1});
const insertWorkerBetterMemory = new WorkerNodes(require.resolve('./insert-bettersqllite'),{maxWorkers :1});
const insertWorkerBetterHD = new WorkerNodes(require.resolve('./insert-bettersqllite-hd'),{maxWorkers :1});

//insertWorker.call('teste').then(msg => console.log(msg));  // -> 'hello from separate process!'

const TIMES_TEST_BIG = 1000*1000;//10MB

const TIMES_TEST_MEDIUM = 500*1000;//5MB

const TIMES_TEST_SMALL = 100*1000;//1MB

const TIMES_TEST_TINY = 1*1000;//100KB

 

function normalTest(db) {
 

  var promisse = new Promise((resolve, reject) => {
    db.run('CREATE TABLE IF NOT EXISTS characters (name text)', function (err) {
      if (err) {
        return console.error(err.message);
      }

      console.log(`Create table `);

      let sql = "INSERT INTO characters VALUES (?)";

   

      db.run(sql, ['Kenzo'], function (err) {
        if (err) {
          return console.error(err.message);
        }

        console.log(`A row has been inserted with rowid ${this.lastID}`);

        db.serialize(() => {
          db.each(`SELECT name  
                   FROM characters`, (err, row) => {
            if (err) {
              console.error(err.message);
            }
            console.log("row", row);
          });
          resolve();
        });
      });
    });
  });
  return promisse;
}
 
function writePerformanceTest(insertWorker,verbose,dump,times,granul) { 
  let first = true;
  const ret = new Promise((resolve,reject)=>{
    const startTimeWrite = performance.now();
    console.log("Sending to worker inserts:",times);
    for(let index=1;index<=times;index++)
    {
      if(index%Math.round(times/granul)==0)
      {
        process.stdout.write("%");
      }


      insertWorker.call(verbose,false).then(()=>{ 
        if(first)
        {
          first=false;
          console.log("\nReceving from  worker insert result");
        
        }
        if( index==times)
        {
          console.log("\nReceived from  worker insert result");
          resolve(performance.now() - startTimeWrite);
          if(dump)
          {
            console.log("\n==START DUMP==");
            insertWorker.call(verbose,true).then(()=>{ 
              console.log("\n==END DUMP==");
            });
          }
          
        
        }
        else{
          if( (index%Math.round(times/granul))==0)
          {
            process.stdout.write("%");
          }
        }
      });
    }  
  });
  return ret;
}



async function runMemoryDBPerformance(insertWorker,options) {
 
 
  if(!options || options.all || options.tiny)
  {

    let timeWrite =  await writePerformanceTest(insertWorker,false,true,TIMES_TEST_TINY,10); 
    console.log("memory DB Write test for line is " + (timeWrite/(1000*TIMES_TEST_TINY)) + "s in a tiny table.") ; 
    let startMemory = process.memoryUsage().rss; 
    console.log("Total memory used  " ,  startMemory/(1024*1024) + "Mb" );
  
  }
 
  if(!options || options.all || options.small)
  {

    timeWrite =  await writePerformanceTest(insertWorker,false,true,TIMES_TEST_SMALL,100); 
    console.log("memory DB Write test for line is "  + (timeWrite/(1000*TIMES_TEST_SMALL)) + "s in a small table.");  
    startMemory = process.memoryUsage().rss;
    console.log("Total memory used  " ,  startMemory/(1024*1024) + "Mb" );
  }

   
  if(!options || options.all || options.medium)
  {

    timeWrite =  await writePerformanceTest(insertWorker,false,true,TIMES_TEST_MEDIUM,100); 
    console.log("memory DB Write test for line is "  + (timeWrite/(1000*TIMES_TEST_MEDIUM)) + "s in a normal table."); 
    startMemory = process.memoryUsage().rss; 
    console.log("Total memory used  " ,  startMemory/(1024*1024) + "Mb" );
  }


  if(!options || options.all || options.big)
  {


 
    timeWrite =  await writePerformanceTest(insertWorker,false,true,TIMES_TEST_BIG,200); 
    console.log("memory DB Write test for line is "  + (timeWrite/(1000*TIMES_TEST_BIG)) + "s in a big table.");  
    startMemory = process.memoryUsage().rss;
    console.log("Total memory used  " ,  startMemory/(1024*1024) + "Mb" );
  }
 
 
}

async function runMemoryDB() {

  //cria em memoria
  //let db = new sqlite3.Database(':memory:');
  let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');

  });


  await normalTest(db);

  //  db.close();
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}


async function runFileDB() {

  let db = new sqlite3.Database('./db/characters.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the file  SQlite database.');
  });


  await normalTest(db);

  //  db.close();
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });


}

async function commonAsyncDBFunction(db){
  
    // Access the inner sqlite3.Database object to use the API that is not exposed by AsyncDatabase.
    db.inner.on("trace", (sql) => console.log("[TRACE]", sql));

 
    // Run some sql request.
    await db.run(
      "CREATE TABLE IF NOT EXISTS foo (id INTEGER PRIMARY KEY AUTOINCREMENT, a TEXT NOT NULL, b TEXT)"
    );
   
   await db.run("INSERT INTO foo (a, b) VALUES (?, ?)", "alpha", "beta");
   
   await db.run("INSERT INTO foo (a, b) VALUES ($goo, $hoo)", {
     $goo: "GOO !",
     $hoo: "HOO :",
   });
   await db.run("INSERT INTO foo (a, b) VALUES (?, ?)", [
     "Value of a",
     "Value of b",
   ]);

   // Read database.
   let row = await db.get("SELECT * FROM foo WHERE id = ?", 2);
   console.log(row)
   const rows = await db.all("SELECT * FROM foo");
   await db.each("SELECT * FROM foo WHERE id > ?", 5, (row) =>
     console.log(row)
   );

   // Create a async statement
   const statement = await db.prepare("SELECT * FROM foo WHERE id = ?", 2);
    row = await statement.get();
    console.log(row);
    statement.finalize();
}

async function runAsyncDB() {
  try {
    // Create the AsyncDatabase object and open the database.
    const db = await AsyncDatabase.open("./db/characters.db");

    await commonAsyncDBFunction(db);
   
    // Close the database.
    await db.close();
  } catch (err) {
    console.error(err);
  }
}

(async () => {
 // await runFileDB();
 // await runMemoryDB();
 // await runAsyncDB();
 // await runMemoryDBPerformance(insertWorkerMemory,{tiny:true,small:true,medium:false,big:false}); 
// await runMemoryDBPerformance(insertWorkerHD,{all:true}); 
 //await runMemoryDBPerformance(insertWorkerBetterMemory,{tiny:true,small:true,medium:true,big:true}); 
 await runMemoryDBPerformance(insertWorkerBetterHD,{all:true}); 
  
})();
