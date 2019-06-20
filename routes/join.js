const express = require('express');
const router = express.Router();
const user = require('../models/userModel');
const crypto = require('crypto');

router.get('/',(req,res,next)=>{
    res.render('join',{ID:null});
});

router.post('/',(req,res,next)=>{
    user.findOne({ID:req.body.ID})
    .then(async (result) => {
        if(result) res.send('already exist ID');
        else{
            try {
                const PW = await crypto.createHash('sha512').update(req.body.PW).digest('base64');
                const User = await new user({
                    ID: req.body.ID,
                    PW: PW
                });
                await User.save();
                res.render('redirect', {
                    path: '/',
                    message: '회원가입 성공'
                });
            }catch(err){
                console.error(err);
                res.render('error',{error:err});
            }
        }
    }).catch((err) => {
        console.error(err);
        res.render('error',{error:err});
    });
});

module.exports = router;