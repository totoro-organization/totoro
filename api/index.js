const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const html = require('./html');

const PORT = process.env.API_DOCKER_PORT || 8080;
const server = express();

server.use(cors({ origin: '*' }));

server.use(express.static(__dirname + '/data'));

server.use(bodyParser.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200)
    .send(html.home());
});

server.listen(PORT, function() {
    console.log('server start')
});