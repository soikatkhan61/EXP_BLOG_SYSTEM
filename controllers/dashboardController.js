const db = require('../config/dbconfig')
exports.dashboardGetController = (req,res,next) =>{
    
    let query = "SELECT * FROM posts"
    db.query(query,(e,rows)=>{
        if(e){
            console.log(e)
        }
        else{
            for(let row of rows){
                console.log(row)
            }
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
            for(let row of rows){
                console.log(row)
            }
            res.render('index',{rows})
        }
    })
}
