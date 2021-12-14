const http = require('http');
const path = require('path');
const fs = require('fs');

// Las variables de entorno de node esta en process.env

const PORT = process.env.PORT || 5000; // Si en process.env no existe PORT entonces usará el valor 5000

// Creamos un objeto servidor web http

const server = http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url === '/'){
        fs.readFile(
            path.join(__dirname,"public","index.html"), (err,content) =>{
                res.writeHead(200,{"Content-Type" : "text/html"});
                res.end(content);
            }
        )

    }else if(req.url === '/about.html'){
        
        fs.readFile(
            path.join(__dirname,"public","about.html"), (err,content) =>{
                res.writeHead(200,{"Content-Type" : "text/html"});
                res.end(content);
            }
        )
    }else if(req.url === '/api/mascotas'){
        // serviremos un JSON en lugar de un http
        const mascotas = [
            {nombre: "cazan", tipo:"perro"},
            {nombre: "chiqui", tipo:"gato"},
        ]
        res.writeHead(200,
            {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
            }
            );
        res.end(JSON.stringify(mascotas));

    }else{
        fs.readFile(
            path.join(__dirname,"public","404.html"), (err,content) =>{
                res.writeHead(404,{"Content-Type" : "text/html"});
                res.end(content);
            }
        )
    }

})
// Hacemos que el servidor escuche en el puerto designado
server.listen(PORT,()=> console.log('Servidor escuchando en el puerto ',PORT));