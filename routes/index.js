const express = require('express');
const router = express.Router();
const post = require('../models/postModel');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.ID) {
    post.find().limit(10).populate({
        path: 'author'
      })
      .then((result) => {
        res.rendr('index', {
          postList: result,
          ID:req.session.ID
        });
      }).catch((err) => {
        throw err;
      });
  }
  else{
    post.find().limit(10).populate({
        path: 'author'
      })
      .then((result) => {
        res.rendr('index', {
          postList: result
        });
      }).catch((err) => {
        throw err;
      });
  }
});

module.exports = router;
