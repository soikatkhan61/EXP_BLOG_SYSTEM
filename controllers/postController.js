const { query } = require("express")
const { redirect } = require("express/lib/response")
const db = require('../config/dbconfig')


exports.createPostGetController = (req, res, next) => {
    let sql = "SELECT * FROM categories"
    db.query(sql, (e, rows) => {
        if (e) {
            console.log(e)
        }
        if (rows.length > 0) {
            res.render('posts/createPost', { rows })
        }
        else {
            rows = []
            res.render('posts/createPost', { rows })
        }
    })

}


exports.createPostPostController = (req, res, next) => {
    console.log("post controller")
    let { title, body } = req.body
    let thumbnail = 'nai'
    let author_name = req.user.name
    let tags = 'EXP_BLOG'
    let comment_count = 0
    let like_count = 0;
    let Description = req.body.Description
    let category = req.body.category
    let readtime = 1

    let findAuthorId = `SELECT * FROM posts INNER JOIN users WHERE users.id=${req.user.id} LIMIT 1`
    let author_id


    db.query(findAuthorId, (e, rows) => {
        if (e) {
            console.log(e)
        }
        else {
            author_id = rows[0].id
            console.log(author_id)
            let sql = `INSERT INTO posts VALUES(null,'${title}','${body}','${author_id}','${tags}','${category}','${comment_count}','0','${like_count}','${thumbnail}','${readtime}',null,'${Description}','${author_name}')`

            db.query(sql, (e, rows) => {
                if (e) {
                    console.log(e)
                } else {
                    res.redirect('/dashboard')
                }
            })
        }
    })


}

exports.singlePostGetController = (req, res, next) => {

    let post_id = req.params.id

    let sql = `SELECT * FROM posts join users where post_id=${post_id} limit 1`
    db.query(sql, (e, rows) => {
        if (e) {
            console.log(e)
        }
        if (rows.length > 0) {
            res.render('posts/single', { rows })
        } else {
            res.send("no post found!")
        }

    })

}

exports.categorySearchGetController = (req, res, next) => {

    let cat_name = req.params.cat_name

    let sql = `SELECT * FROM posts WHERE category='${cat_name}'`
    db.query(sql, (e, rows) => {
        if (e) {
            console.log(e)
        }
        if (rows.length > 0) {
            res.render('posts/category', { rows })
        } else {
            res.send("no post found!")
        }

    })
}


exports.commentsPostController = (req, res, next) => {

    let post_id = req.params.post_id
    let comments = req.body.comment

    let findAuthorId = "SELECT * FROM posts INNER JOIN users WHERE users.id=102  LIMIT 1"
    let author_id


    db.query(findAuthorId, (e, rows) => {
        if (e) {
            console.log(e)
        }
        else {
            author_id = rows[0].id
            console.log(author_id)
            let sql = `INSERT INTO comments VALUES(null,'${post_id}',${author_id},'${comments}',null)`

            db.query(sql, (e, rows) => {
                if (e) {
                    console.log(e)
                } else {
                    res.redirect(`/posts/${post_id}`)
                }
                
            })
        }
    })
}


exports.searchGetController = (req, res, next) => {

    console.log("hello")

    let search_term = req.body.search_term

    let searchReault = `SELECT * FROM posts where title like '%${search_term}%' LIMIT 5`



    db.query(searchReault, (e, rows) => {
        if (e) {
            console.log(e)
        }
        else {
            res.render('posts/search',{rows})
        }
    })
}





