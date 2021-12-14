const http = require("http");
const path = require("path");
const fs = require("fs");

// Las variables de entorno de node esta en process.env

const PORT = process.env.PORT || 5000; // Si en process.env no existe PORT entonces usará el valor 5000

// Creamos un objeto servidor web http

const server = http.createServer((req, res) => {
  /**
   * Con un enrutado dinámico
   */
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  let extFile = path.extname(req.url);
  
  
  fs.readFile(filePath,(err, data) =>{
      if (err){
          if(err.code == "ENOENT"){
              // no existe mostramos las 404
                fs.readFile(path.join(__dirname,"public","404.html"), (err, data)=>{
                    res.writeHead(200, { "Content-Type": getContentType(path.join(__dirname,"public","404.html")) });
                    res.end(data);
                })
          }else{
              // Error de servidor 500
              res.writeHead(500,err.message);
              res.end(`Error en el servidor: ${err.code} ${err.message}`);
          }
        
      }else{
          console.log(data.toString());
        // Servir el archivo
            res.writeHead(200, { "Content-Type": getContentType(req.url) });
            res.end(data.toString());
      }
  })
})

// Hacemos que el servidor escuche en el puerto designado
server.listen(PORT, () =>
  console.log("Servidor escuchando en el puerto ", PORT)
)


function getContentType(file){
    let extFile = path.extname(file);
    let contentType;

  switch (extFile) {
    case ".json":
      contentType = "application/json";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".csv":
      contentType = "text/csv";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".svg":
      contentType = "image/svg+xml";
      break;
    case ".webp":
      contentType = "image/webp";
      break;

    default:
      contentType = "text/html";
  }
  return contentType;
}