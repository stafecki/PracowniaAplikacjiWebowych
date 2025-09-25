const http = require("http");

http.createServer(async (req, res) => {
    switch (req.url) {
        case "/":
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write('Strona główna');
            res.end();
            break;
        case "/jsonDoc":
            res.writeHead(200, {'Content-Type': 'application/json'});
            const obj = {name: 'John', surname: 'Doe', age: 67};
            res.end(JSON.stringify(obj));
            break;
        case "/internalHTML":
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<!DOCTYPE html>\n' +
                '<html lang="en">\n' +
                '<head>\n' +
                '    <meta charset="UTF-8">\n' +
                '    <title>Title</title>\n' +
                '</head>\n' +
                '<body>\n' +
                '    <h1>Dokument utworzony przez node</h1>\n' +
                '</body>\n' +
                '</html>');
            res.end();
            break;
        case "/externalHTML":
            const fs = require('fs/promises');
            res.writeHead(200, {'Content-Type': 'text/html'});
            /*fs.readFile('index.html', 'utf8', (err, data) => {
                if (!err) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                }
                else{
                    console.log(err)
                    res.end();
                }
            })*/
            const file = await fs.readFile('index.html', 'utf8');
            res.end(file);

            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("Not Found");
    }
}).listen(8080);
