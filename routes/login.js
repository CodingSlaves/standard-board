const express = require('express');
const router = express.Router();
const user = require('../models/userModel');
const crypto = require('crypto');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login.html');
});

router.post('/',(req,res,next)=>{
  user.findOne({ID:req.body.ID, PW:crypto.createHash('sha512').update(req.body.PW).digest('base64')})
  .then((result) => {
    if(result) {
      req.session.ID = req.body.ID;
      res.redirect('/main');
    }
  }).catch((err) => {
    
  });
})

module.exports = router;
