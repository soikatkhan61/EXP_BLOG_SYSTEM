const { query } = require("express")
const { redirect } = require("express/lib/response")
const db = require('../config/dbconfig')


exports.createPostGetController = (req,res,next) =>{
    let sql  = "SELECT * FROM categories"
    db.query(sql,(e,rows)=>{
        if(e){
            console.log(e)
        }
        if(rows.length>0){
            res.render('posts/createPost',{rows})
        }
        else{
            rows = []
            res.render('posts/createPost',{rows})
        }
    })
   
}


exports.createPostPostController = (req,res,next) =>{
    console.log("post controller")
    let {title,body} = req.body
    let thumbnail = 'nai'
    let author_name = req.user.name
    let tags = 'defaultss'
    let comment_count = 0
    let like_count = 0;
    let category = req.body.category
    let readtime = 1

    let sql =  `INSERT INTO posts VALUES(null,'${title}','${body}','101','${tags}','${category}','${comment_count}','0','${like_count}','${thumbnail}','${readtime}',null)`

    db.query(sql,(e,rows)=>{
        if(e){
            console.log(e)
        }else{
            console.log("hoise")
        }
    })
}

exports.singlePostGetController = (req,res,next) =>{
    
    let post_id = req.params.id

    let sql = `SELECT * FROM posts WHERE post_id=${post_id}`
    db.query(sql,(e,rows)=>{
        if(e){
            console.log(e)
        }
        if(rows.length>0){
            res.render('posts/single',{rows})
        }else{
            res.send("no post found!")
        }
       
    })
}

exports.categorySearchGetController = (req,res,next) =>{
    
    let cat_name = req.params.cat_name

    let sql = `SELECT * FROM posts WHERE category='${cat_name}'`
    db.query(sql,(e,rows)=>{
        if(e){
            console.log(e)
        }
        if(rows.length>0){
            res.render('posts/category',{rows})
        }else{
            res.send("no post found!")
        }
       
    })
}





