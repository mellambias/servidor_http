const http = require('http');
const path = require('path');
const fs = require('fs');

// Las variables de entorno de node esta en process.env

const PORT = process.env.PORT || 5000; // Si en process.env no existe PORT entonces usará el valor 5000

// Creamos un objeto servidor web http

const server = http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url === '/'){
        res.writeHead(200,{"Content-Type" : "text/html"});
        res.end("<h1>HOME mi home</H2>");
    }

})
// Hacemos que el servidor escuche en el puerto designado
server.listen(PORT,()=> console.log('Servidor escuchando en el puerto ',PORT));