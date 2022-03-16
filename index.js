// run `node index.js` in the terminal
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.get('/', function (req, res) {
  res.render('main', {});
});

app.set('view engine', 'hbs');
app.set('views', __dirname);
app.use(express.static(path.join(__dirname, '')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080);
