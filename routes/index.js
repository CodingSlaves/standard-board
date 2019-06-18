const express = require('express');
const router = express.Router();
const post = require('../models/postModel');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.ID) {
    post.find().populate({
        path: 'author'
      })
      .then((result) => {
        res.rendr('index', {
          postList: result,
          ID:req.session.ID
        });
      }).catch((err) => {
        res.render('error',{error:err});
        throw err;
      });
  }
  else{
    post.find().populate({
        path: 'author'
      })
      .then((result) => {
        res.rendr('index', {
          postList: result
        });
      }).catch((err) => {
        res.render('error', {error: err});
        throw err;
      });
  }
});

// router.get('/',(req,res)=>{
//   res.render('index.ejs');
// });
// router.get('/login.ejs',(req,res)=>{
//   res.render('login.ejs');
// });
// router.get('/join.ejs',(req,res)=>{
//   res.render('join.ejs');
// });

module.exports = router;
