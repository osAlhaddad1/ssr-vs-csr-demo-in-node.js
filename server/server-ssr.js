const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const data = JSON.parse(fs.readFileSync('./data.json'));

    const html = `
    <!DOCTYPE html>
    <html>
    <head><title>Real SSR Demo</title></head>
    <body>
        <h1>Server-Side Rendering</h1>
        <div id="app">
            <h2>${data.title}</h2>
            <ul>${data.items.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>3
        <p><em>No JavaScript needed to show this list!</em></p>
    </body>
    </html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});

server.listen(3000, () => console.log('http://localhost:3000'));