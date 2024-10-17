const express = require('express');
const next = require('next');

const isDev = process.env.NODE_ENV !== 'production';
const app = next({ dev: isDev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Define custom routes if needed
    server.get('/api/example', (req, res) => {
        res.json({ message: 'Hello from Express!' });
    });

    server.get('/api/work', (req, res) => {
        res.json({ message: 'Api is working!' });
    });

    // Handle all other requests with Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});
