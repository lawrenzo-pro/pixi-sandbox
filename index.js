var express = require('express');
var app = express();
var app = express();
var handlebars = require('express-handlebars')
     .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
//DB SETUP
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'lawrence',
  password: 'password',
  database: 'pixi'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
//END OF DB SETUP
app.get('/',function(req,res){
     res.render('home')
})
// custom 404 page
app.use(function(req, res){
     res.status(404);
     res.render('404')
});
     // custom 500 page
app.use(function(err, req, res, next){
     console.error(err.stack);
     res.render('500');
     res.status(500);
});
app.listen(app.get('port'), function(){
     console.log( 'Express started on http://localhost:' +
     app.get('port') + '; press Ctrl-C to terminate.' );
});