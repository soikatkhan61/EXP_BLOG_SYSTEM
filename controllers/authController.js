const { query } = require("express")
const { redirect } = require("express/lib/response")
const db = require('../config/dbconfig')


exports.loginGetController = (req,res,next) =>{
    console.log(req.session)
    res.render('auth/auth', {signupMode:false,msg:""})
}

exports.loginPostController = (req,res,next) =>{
    let {email,password} = req.body

    let sql = `SELECT * FROM users WHERE email='${email}' and password='${password}'`

    db.query(sql,function(e,rows){
        if(e){
           return res.send(e)
        }
        if(rows.length > 0){
            req.session.isLoggedIn = true
            req.session.user = rows[0]
            req.session.save(err=>{
                if(err){
                    console.log(err);
                    return next(err)
                }
            })
            res.redirect('/dashboard')
        }else{
            res.render('auth/auth', {signupMode:false,msg:"Invalid Credential!"})
        }
    })
}

exports.registerGetController = (req,res,next) =>{
    res.render('auth/auth', {signupMode:true,msg:""})
}

exports.registerPostController = (req,res,next) =>{
    let {username,email,password,c_password} = req.body

    if(password !== c_password){
        return res.render('auth/auth', {signupMode:true,msg:""})
    }

    let sql = `INSERT INTO users VALUES ( null,'${username}','${email}','${password}')`

    db.query(sql,function(e,rows){
        if(e){
            res.send(e)
        }else{
            res.redirect('/auth/create_profile')
        }
    })
}

exports.createProfileGetController = (req,res,next) =>{
    res.render('posts/createProfile')
}
exports.createProfilePostController = (req,res,next) =>{
    let {name,education,address,skill} = req.body


    let sql = `INSERT INTO profiles VALUES ( 1,${req.user.id},'${name}','${address}','${education}','${skill}')`

    db.query(sql,function(e,rows){
        if(e){
            res.send(e)
        }else{
            res.send("Insert Complete!!")
        }
    })
}

exports.logoutController = (req,res,next) =>{
    req.session.destroy(err=>{
        if(err){
            console.log(err);
            return next(err)
        }

        return res.redirect('/auth/login')
    })
}