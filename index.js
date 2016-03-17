var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('./config/db');
var post = require('./controllers/posts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/posts', post.list);

app.get('/posts/new', post.form);
app.post('/posts', post.create);

app.post('/posts/:id', post.update);
app.get('/posts/:id', post.show);

app.get('/posts/delete/:id', post.remove);

db.connect('mongodb://localhost:27017/contents', function(){
  console.log('MongoDB started...');
  app.listen(3000,function(){
    console.log("Express started");
  });
});
