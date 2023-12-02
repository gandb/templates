const sqlite3 = require('sqlite3').verbose();


function runMemoryDB(){

//cria em memoria
//let db = new sqlite3.Database(':memory:');
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.run('CREATE TABLE characters (name text)', function(err){
    if (err) {
        return console.error(err.message);
      }
      
    console.log(`Create table `);
    
  let sql = "INSERT INTO characters VALUES (?)";

  db.run(sql, ['Kenzo'], function(err){
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
          console.log( "row",row);

                        
                //  db.close();
                db.close((err) => {
                    if (err) {
                    return console.error(err.message);
                    }
                    console.log('Close the database connection.');
                });
        });
      });
      
  });


  });


}


function runFileDB(){
  
    let db = new sqlite3.Database('./db/characters.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the file  SQlite database.');
      });
    
      db.run('CREATE TABLE IF NOT EXISTS characters (name text)', function(err){
        if (err) {
             return console.error(err.message);
          }
          
        console.log(`Create table `);
        
      let sql = "INSERT INTO characters VALUES (?)";
    
      db.run(sql, ['Kenzo'], function(err){
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
              console.log( "row",row);
    
                            
                    //  db.close();
                    db.close((err) => {
                        if (err) {
                        return console.error(err.message);
                        }
                        console.log('Close the database connection.');
                    });
            });
          });
          
      });
    
    
      });
    
    
    }
    
    
runMemoryDB();
runFileDB();
//usando a api async
const { AsyncDatabase } = require("promised-sqlite3");

(async () => {
  try {
    // Create the AsyncDatabase object and open the database.
    const db = await AsyncDatabase.open("./db/characters.db");

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
    const row = await db.get("SELECT * FROM foo WHERE id = ?", 2);
    console.log(row)
    const rows = await db.all("SELECT * FROM foo");
    await db.each("SELECT * FROM foo WHERE id > ?", 5, (row) =>
      console.log(row)
    );

    // Create a async statement
    const statement = await db.prepare("SELECT * FROM foo WHERE id = ?", 2);
     row = await statement.get();
     console.log(row)

    // Close the database.
    await db.close();
  } catch (err) {
    console.error(err);
  }
})();