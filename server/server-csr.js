const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/api/data') {
        const data = fs.readFileSync('./data.json');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(data);
    }


    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Real CSR Demo</title>
        <style>body { font-family: sans-serif; padding: 20px; }</style>
    </head>
    <body>
        <h1>Client-Side Rendering</h1>
        <div id="app">
            <p style="color: red;">[Wait for it...] I am an empty div right now.</p>
        </div>

        <script>

            console.log('1. Page loaded. Now starting data fetch...');
            
            fetch('/api/data')
                .then(res => res.json())
                .then(data => {
                    console.log('2. Data received! Rendering now...');
                    const container = document.getElementById('app');
                    container.innerHTML = \`
                        <h2>\${data.title}</h2>
                        <ul>\${data.items.map(i => \`<li>\${i}</li>\`).join('')}</ul>
                    \`;
                });
        </script>
    </body>
    </html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});

server.listen(4000, () => console.log('http://localhost:4000'));