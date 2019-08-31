var formidable = require('express-formidable');
const router = require('express').Router();
const fs = require('fs');
const pdf = require('pdf-parse');
var dataBuffer;
var multer  = require('multer');
var bodyParser = require('body-parser');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });


router.get('/pdf', async function (req, res) {  
 
    await new Promise(()=>{
        pdf(dataBuffer).then(function(data) {       
            var text = data.text;
           // console.log(data.text);
            return res.send(data);
        }).catch(()=>{
            return res.send("Ha ocurrido un error");
        });
    });
});
var upload = multer({ storage: storage });

router.post('/upload', upload.array('gatos', 12), async function(req, res) {
    var ar = req.files;
    var text = [];
    for (var i = 0; i < ar.length; i++) {
        dataBuffer = fs.readFileSync('uploads/'+ar[i].originalname);
        await new Promise((resolve, reject) => {
            pdf(dataBuffer).then(function(data) {       
               // console.log(data.text)
                text[i] = data.text; 
                resolve();
            });
          });
    }
    console.log('¡Se ha subido un archivo!');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(text));
});

module.exports = router;