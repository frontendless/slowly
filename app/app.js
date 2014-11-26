var express = require('express')
var cons = require('consolidate');
var bodyParser = require('body-parser');
var swig = require('swig');
swig.setDefaults({ cache: false, varControls: ['{[', ']}'] });

var app = express()

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', [__dirname + '/../dist/templates',  __dirname + '/templates']);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    setTimeout(next, Math.floor(Math.random() * 500));
})

app.use(express.static('dist'))
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home', {
    title: 'Slowly',
  });
});

app.get('/login', function (req, res) {
  res.render('login', {
    title: 'Slowly login'
  });
});

app.get('/details', function (req, res) {
  res.render('details', {
    title: 'Slowly data',
  });
});

app.get('/details.json', function (req, res) {
  var response = [];
  for(var i = 1; i < 129; i++) {
    var row = {
        key: i,
        cells: []
    };
    for(var j = 1; j < 129; j++) {
        row.cells.push({
            key: j,
            text: j * i * Math.floor(Math.random()*10)
        });
    }
    response.push(row);
  }
  res.json(response);
});

app.post('/login', function(req, res) {
    setTimeout(function() {
        if(!req.body.password) {
            return res.json({error: "Password cannot be empty"});
        }
        if(req.body.email.indexOf('@') == -1) {
            return res.json({error: "Invalid email address"});
        }
        if(req.body.email != req.body.password) {
            return res.json({error: "Invalid email / password combination"});
        }
        return res.json({redirect: "/details"});
    }, 4000);
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Slowly app listening at http://%s:%s', host, port)

})