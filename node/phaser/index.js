const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 8000;



 
  
http.createServer((req, res) => {
    if (req.url == '/assets/logo') {
        let image =  fs.readFileSync("assets/logo100x50.png"); 
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(image);
        res.end(); 


      } 
      else if (req.url == '/assets/green') {
        console.log("pediu green");
        let image =  fs.readFileSync("assets/green.png" );

        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(image);
        res.end();
      } else if (req.url == '/assets/background') { 
        let image  = fs.readFileSync("assets/space3.png"); 
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(image);
        res.end();  


      } else {
        
        let html = "";
        fs.readFile("index.html", 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
          
            html=data; // O conteúdo do arquivo de texto
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();
          });

      
      }


}).listen(port, () => {
    console.log(`App is running on port ${port}`);
});