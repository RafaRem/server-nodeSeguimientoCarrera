
var express = require('express');
var form = require('express-formidable');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cors = require('cors');


const path = require('path');





//setings
var app = express();
app.set('views', path.join(__dirname, 'vista'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); 


//midelware
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

//router
//app.use(require('./routers/routers'));
//app.use(express.static(path.join(__dirname, 'cliente/dist/cliente')));
app.use(require('./routers/apis'));


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});