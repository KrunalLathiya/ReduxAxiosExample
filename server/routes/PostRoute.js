const express = require('express');
const app = express();
const PostRoute = express.Router();

// Require Post model in our routes module
let Post = require('../models/Post');

// Defined store route
PostRoute.route('/add').post(function (req, res) {
  let post = new Post(req.body);
  post.save()
    .then(post => {
    res.status(200).json(post);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
PostRoute.route('/').get(function (req, res) {
    Post.find(function (err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts);
    }
  });
});

// Defined delete | remove | destroy route
PostRoute.route('/delete/:id').get(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post){
        if(err) res.json(err);
        else res.json(req.params.id);
    });
});

module.exports = PostRoute;
