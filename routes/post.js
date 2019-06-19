const express = require('express');
const router = express.Router();
const post = require('../models/postModel');
const user = require('../models/userModel');

router.get('/:num',(req,res,next)=>{
    post.findOne({num:req.params.num}).populate({path:'author'}).populate({path:'comment.author'})
    .then((result) => {
        res.render('post',{post:result});
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
        contents:req.body.contents,
        author:User
    });
    await Post.save();
    res.render('redirect',{path:'/', message:'업로드 완료'});
    }catch(err){
        console.error(err);
        res.render('error',{error:err});
    }
});

router.post('/:num/comment',async(req,res,next)=>{
    try{
        const User = await user.findOne({ID:req.session.ID});
        await post.findOneAndUpdate({num:req.params.num},{$push:{comment:{author:User,contents:req.body.contents}}});
        res.redirect(`/${req.params.num}`);
    }catch(err){
        console.error(err);
        res.render('redirect',{path:`${req.params.num}`,message:'댓글 달기 실패'});
    }
});

module.exports = router;