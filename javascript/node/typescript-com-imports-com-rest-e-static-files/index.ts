const express = require('express');
const path = require('path');
const app = express();
const port = process.env["PORT"] || 3000;
const publishFrontEnd = process.env["IS_FRONTEND"] || false;


if(publishFrontEnd)
{
    app.use(express.static(path.join(__dirname, '../dist/contas/browser')));
}

app.get('/hello', (req:any, res:any) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));
