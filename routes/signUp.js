const express = require('express');
const router = express.Router();
const user = require('../models/userModel');
const crypto = require('crypto');

router.get('/',(req,res,next)=>{
    res.render('signup');
});