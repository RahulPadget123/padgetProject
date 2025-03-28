const userModel = require('../models/user');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function handelCreateUser(req, res){
    let {name, email, password, age} = req.body;
    if(!name || !email || !password || !age){
        return res.status(400).json({message: 'All fields are required'});
    }
    let user = await userModel.findOne({email: email});
    if(user) return res.status(400).json({message: 'User already exists'});

    let userInfo = await userModel.create({
        name,
        email,
        age,
        password: hash
    });
    const token = jwt.sign({email: user.email, userid: user._id}, "secret");
    res.cookie("token", token);
    return res.redirect("/profile");
}

async function handelCreatePage(req, res){
    return res.render("index");
}

async function handelLogout(req, res){
    res.cookie("token","");
    return res.redirect("/login");
}

async function handelProfile(req, res){
    const user = await userModel.findOne({email: req.user.email}).populate('details');
    return res.render("profile",{user});
}

async function handelLoginPage(req, res){
    return res.render("login");
}

async function handelUserLogin(req, res){
    let {email, password} = req.body;
    let user = await userModel.findOne({email: email});
    if(!user) return res.redirect("/");
    
    if(password == user.password){
        const token = jwt.sign({email: user.email, userid: user._id}, "secret");
        res.cookie("token", token);
        return res.redirect("/profile");
    }else{
        return res.redirect("/login");
    }
}

module.exports = {
    handelCreateUser,
    handelCreatePage,
    handelLogout,
    handelLoginPage,
    handelProfile,
    handelUserLogin,
}