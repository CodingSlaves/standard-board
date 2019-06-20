const express = require('express');
const router = express.Router();
const post = require('../models/postModel');
const user = require('../models/userModel');

router.get('/upLoad',(req,res,next)=>{
    if(!req.session) res.render('redirect',{path:'/',message:'로그인 하고 오세요'});
    else res.render('posting',{ID:req.session.ID});
});

router.get('/:id',(req,res,next)=>{
    post.findOne({_id:req.params.id}).populate({path:'author'}).populate({path:'comment.author'})
    .then((result) => {
        if(!req.session) res.render('post',{ID:null,post:result});
        else res.render('post',{ID:req.session.ID,post:result});
    }).catch((err) => {
        console.error(err);
        res.render('error',{error:err});
    });
});

router.post('/upLoad',async(req,res,next)=>{
    try{
    const User = await user.findOne({ID:req.session.ID});
    const Post = new post({
        title:req.body.title,
        contents: req.body.contents,
        author:User
    });
    await Post.save();
    res.render('redirect',{path:'/', message:'업로드 완료'});
    }catch(err){
        console.error(err);
        res.render('error',{error:err});
    }
});

router.post('/comment',async(req,res,next)=>{
    try{
        const User = await user.findOne({ID:req.session.ID});
        await post.findOneAndUpdate({_id:req.body.id},{$push:{comment:{author:User,contents:req.body.contents}}});
        res.redirect(`/post/${req.body.id}`);
    }catch(err){
        console.error(err);
        res.render('redirect',{path:`${req.body.id}`,message:'댓글 달기 실패'});
    }
});

module.exports = router;