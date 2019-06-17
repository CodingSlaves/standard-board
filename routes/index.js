const express = require('express');
const router = express.Router();
const post = require('../models/postModel');

/* GET home page. */
// router.get('/', (req, res, next) => {
//   if (!req.session.ID) {
//     post.find().limit(10).populate({
//         path: 'author'
//       })
//       .then((result) => {
//         res.rendr('index', {
//           postList: result,
//           ID:req.session.ID
//         });
//       }).catch((err) => {
//         throw err;
//       });
//   }
//   else{
//     post.find().limit(10).populate({
//         path: 'author'
//       })
//       .then((result) => {
//         res.rendr('index', {
//           postList: result
//         });
//       }).catch((err) => {
//         throw err;
//       });
//   }
// });

router.get('/',(req,res)=>{
  res.render('index.ejs');
});
router.get('/login.ejs',(req,res)=>{
  res.render('login.ejs');
});
router.get('/join.ejs',(req,res)=>{
  res.render('join.ejs');
});
router.get('/logout.ejs',(req,res)=>{
  res.render('logout.ejs');
});
router.get('/post.ejs',(req,res)=>{
  res.render('post.ejs');
});
router.get('/posting.ejs',(req,res)=>{
  res.render('posting.ejs');
});

module.exports = router;
