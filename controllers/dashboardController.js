const db = require('../config/dbconfig')
exports.dashboardGetController = (req,res,next) =>{
    console.log(req.user.id)
    let query = `SELECT * FROM posts WHERE posts.author=${req.user.id} order by post_id desc`
    db.query(query,(e,rows)=>{
        if(e){
            console.log(e)
        }
        else{
            res.render('auth/dashboard',{rows})
        }
    })
}

exports.getHomePage = (req,res,next) =>{
    
    let query = "SELECT * FROM posts"
    db.query(query,(e,rows)=>{
        if(e){
           console.log(e)
           res.render('index',{rows})
        }
        else{
            res.render('index',{rows})
        }
    })
}
