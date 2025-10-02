const http = require("http");
const url = require('url');
const fs = require('fs/promises');


http.createServer(async (req, res) => {
const parsedUrl = url.parse(req.url, true);
    if(parsedUrl.pathname==="/") {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.write('Strona główna');
        res.end();
    }
    else if(parsedUrl.pathname === "/jsonDoc"){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const obj = {name: 'John', surname: 'Doe', age: 67};
        res.end(JSON.stringify(obj));
    }
    else if(parsedUrl.pathname === "/internalHTML"){
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
    }
    else if(parsedUrl.pathname === "/externalHTML"){
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
    }
    else if(parsedUrl.pathname === "/get_params" && req.method === "GET"){
        try {
            console.log(parsedUrl);
            const queryParams = parsedUrl.query;
            console.log(queryParams);
            const timeStamp = Date.now();
            console.log(timeStamp);
            const filename = `params_${timeStamp}.json`;
            await fs.writeFile(filename, JSON.stringify(queryParams), { encoding: 'utf8' });
            const ok = {ok: 'ok'}
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(ok));
        } catch (error) {
            console.error("Error writing params file:", error);
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Failed to save parameters' }));
        }
    }
    else{
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Not Found'}));
    }
}).listen(8080, '127.0.0.1', ()=>{
console.log(`Server running at http://localhost:8080`);
})