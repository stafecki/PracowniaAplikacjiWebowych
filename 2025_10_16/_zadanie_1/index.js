const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.type('text/plain; charset=utf-8').send('Strona główna');
});

app.get('/jsonDoc', (req, res) => {
    const obj = {name: 'John', surname: 'Doe', age: 67};
    res.json(obj);
});

app.get('/internalHTML', (req, res) => {
    res.type('html').send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
            <h1>Dokument utworzony przez node</h1>
        </body>
        </html>
    `);
});

app.get('/externalHTML', async (req, res) => {
    try {
        const file = await fs.readFile('index.html', 'utf8');
        res.type('html').send(file);
    } catch (err) {
        res.status(404).json({error: 'Not Found'});
    }
});

app.get('/get_params', async (req, res) => {
    try {
        const queryParams = req.query;
        const timeStamp = Date.now();
        const filename = `params_${timeStamp}.json`;
        await fs.writeFile(filename, JSON.stringify(queryParams), { encoding: 'utf8' });
        res.json({ok: 'ok'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to save parameters' });
    }
});

app.use(express.static(path.join(__dirname, 'assets')));

app.use((req, res) => {
    res.status(404).json({error: 'Not Found'});
});

app.listen(8080,'127.0.0.1', () => {
    console.log(`Server running at http://localhost:${8080}`);
});