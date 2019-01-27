const express = require('express');
const path = require('path');
const http = require('http');

const dist = path.resolve(__dirname, 'dist');
const app = express();

app.use(express.static(dist));
app.use('/*', function(req, res) {
    res.sendFile(path.join(dist, 'index.html'))
});

const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);