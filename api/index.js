const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const html = require('./html');

const PORT = process.env.API_DOCKER_PORT || 8080;
const server = express();

// const users = require("./services/Users").router;
const admins = require("./services/Admins").router;
// const ads = require("./services/Ads").router;
// const authentifications = require("./services/Authentifications").router;
const commons = require("./services/Commons").router;
// const litigations = require("./services/Litigations").router;
// const messagings = require("./services/Messagings").router;
// const parameters = require("./services/Parameters").router;
// const transactions = require("./services/Transactions").router;
// const subscribements = require("./services/Subscribements").router;
// const terminals = require("./services/Terminals").router;
// const localisations = require("./services/Localisations").router;

server.use(cors({ origin: '*' }));

server.use(express.static(__dirname + '/data'));

server.use(bodyParser.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200)
    .send(html.home());
});

// server.use('/api', authentifications);
// server.use('/api/users', users);
server.use('/api/admins', admins);
// server.use('/api/ads', ads);
// server.use('/api/terminals', terminals);
// server.use('/api/messagings', messagings);
// server.use('/api/transactions', transactions);
// server.use('/api/parameters', parameters);
// server.use('/api/litigations', litigations);
// server.use('/api/subscribements', subscribements);
// server.use('/api/localisations', localisations);
server.use('/api/commons', commons);

server.listen(PORT, function() {
    console.log('server start')
});