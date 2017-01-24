const express = require('express');
const httpProxy = require('http-proxy');

let port = 9000;
let proxyUrl = '';

let app = express();
let proxy = httpProxy.createProxyServer();

app.use(express.static('app'));

// proxy all requests to API server
app.route('/api/**').all(function (req, res) { 
    proxy.web(req, res, {target: proxyUrl});
});

// rewrite all routes to navigate to index.html;
// this way all routes will be handled by the client
app.use((req, res) => res.sendFile(`${__dirname}/app/index.html`));

app.listen(port, function () {
  console.log(`App listening on ${port}!`)
});
