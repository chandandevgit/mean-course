const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./Models/posts');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-twud5.mongodb.net/node-angular?retryWrites=true')
  .then(() => {
    console.log('Connected to Data');
  })
  .catch(() => {
    console.log('Failed to Connect');
  });

app.use((req,res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS")
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/posts', (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: "Post added",
      postid: result._id
    });
  });
})

app.get('/api/posts',(req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: "sucess",
        posts: documents
      })
    });
});

app.delete("/api/posts/:id", (req,res,next) => {
  Post.deleteOne({_id:req.params.id})
  .then(result => {
    console.log(result);
    res.status(200).json({message : 'Post Deleted'});
  })
  .catch(result => {
    console.log('Failed to fetch the data'+ result);
  });
  res.status(200).json({message: 'Post Deleted'});
});


module.exports = app;
