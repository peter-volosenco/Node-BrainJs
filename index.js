// run `node index.js` in the terminal
var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Hi.');
});

app.listen(8080);
