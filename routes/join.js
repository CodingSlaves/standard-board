const express = require('express');
const router = express.Router();
const user = require('../models/userModel');
const crypto = require('crypto');

router.get('/',(req,res,next)=>{
    res.render('join');
});

router.post('/',(req,res,next)=>{
    user.findOne({ID:req.body.ID})
    .then((result) => {
        if(result) res.send('already exist ID');
        else{
            const PW = crypto.createHash('sha512').update(req.body.PW).digest('base64');
            new user({
                ID:req.body.ID,
                PW:PW
            });
        }
    }).catch((err) => {
        console.error(err);
        res.render('error',{error:err});
    });
});