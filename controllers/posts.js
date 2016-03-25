var db = require('../config/db');

exports.list = function(req, res){
  var collection = db.get().collection('posts');

  collection.find({}).toArray(function(err, results){
    res.render('posts/list', {posts:results});
  });
};

exports.show = function(req, res) {
    var collection = db.get().collection('posts');

    collection.find({"title": req.params.id}).limit(1).toArray(function(err, results) {
      console.log(results[0]);
        res.render('posts/show', {post: results[0]});
    });
};

exports.form = function (req, res){
  res.render('posts/form');
};

exports.update = function (req, res){
  var collection = db.get().collection('posts');

  collection.updateOne(
        {title: req.params.id},
        {
            $set: {
              title: req.body.title,
              author: req.body.author,
              category: req.body.category,
              image: req.body.image,
              date: new Date(),
              content: req.body.content
            }
        }
    );

  res.redirect('/posts');
};

exports.create = function (req, res){
  var collection = db.get().collection('posts');
  collection.insert({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    image: req.body.image,
    date: new Date(),
    content: req.body.content
  }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
    });
  res.redirect('/posts');
};

exports.remove = function(req, res){
  var collection = db.get().collection('posts');

  collection.remove({
    title: req.params.id
  });

  return res.redirect('/posts');
};
