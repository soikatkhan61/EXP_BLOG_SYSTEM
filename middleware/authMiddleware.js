const async = require("hbs/lib/async")
const db = require('../config/dbconfig')

exports.bindUserWithRequest = () => {
    return async (req,res,next) =>{
        if(!req.session.isLoggedIn){
            return next()
        }

        try {
            let user
            let query = `SELECT * FROM users WHERE id=${req.session.user.id}`
            await db.query(query,(e,rows)=>{
                if(e){
                    console.log(e)
                }else{
                    user = rows[0]
                    req.user = user   
                    next() 
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

exports.isAuthenticated = (req,res,next) =>{
    if(!req.session.isLoggedIn){
        return res.redirect('/auth/login')
    }

    next()
}

exports.isUnAuthenticated = (req,res,next) =>{
    if(req.session.isLoggedIn){
        return res.redirect('/dashboard')
    }

    next()
}