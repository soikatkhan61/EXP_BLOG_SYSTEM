const { query } = require("express")
const { redirect } = require("express/lib/response")
const db = require('../config/dbconfig')


exports.createPostGetController = (req,res,next) =>{
    console.log("hello")
    res.render('posts/createPost')
}


exports.createPostPostController = (req,res,next) =>{
    console.log("post controller")
    let {title,body} = req.body
    let thumbnail = 'nai'
    let author_name = req.user.name
    let tags = 'defaultss'
    let comment_count = 0
    let like_count = 0;
    let category = 'defaultss'
    let readtime = 1

    let sql =  `INSERT INTO posts VALUES(null,'${title}','${body}','${author_name}','${tags}','${category}','${comment_count}','${like_count}','${thumbnail}','${readtime}',null)`

    db.query(sql,(e,rows)=>{
        if(e){
            console.log(e)
        }else{
            console.log("hoise")
        }
    })
}



