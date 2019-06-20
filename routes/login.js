const express = require('express');
const router = express.Router();
const user = require('../models/userModel');
const crypto = require('crypto');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login',{ID:null});
});

router.post('/',(req,res,next)=>{
  const PW =  crypto.createHash('sha512').update(req.body.PW).digest('base64');
  user.findOne({ID:req.body.ID, PW:PW})
  .then((result) => {
    if(result) {
      req.session.ID = req.body.ID;
      res.render('redirect',{path:'/',message:'로그인 완료'});
    }
  }).catch((err) => {
      console.error(err);
      res.render('error',{error:err});
  });
})

module.exports = router;
