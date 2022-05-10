const dotenv = require("dotenv")
dotenv.config({path:'./.env'})
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./config/dbconfig')
const session = require('express-session')
var moment = require('moment');


const setRoutes = require('./routes/routes')
const {getHomePage} = require('./controllers/dashboardController')


const app = express()

//import middleware
const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

//utilities
var shortDateFormat = "ddd @ h:mmA"; // this is just an example of storing a date format once so you can change it in one place and have it propagate
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat;

const middleware = [
    session({
        secret: "jsdkfjasdkofjopawejflksdafk",
        resave:false,
        saveUninitialized:false
    }),
    bindUserWithRequest(),
    setLocals()
]

app.use(middleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const public = path.join(__dirname,'./public')
app.use(express.static(public))
app.set("view engine",'ejs')

setRoutes(app)



db.connect((err)=>{
    if(err){
        console.log("database not connected")
        console.log(err)
    }else{
        console.log("Database connected!")
    }
})

app.get('/pg',(req,res,next)=>{
    let findAuthorId = "SELECT * FROM posts INNER JOIN users WHERE users.id in (SELECT * FROM users WHERE id=102)"
    let author_id
    
    
    db.query(findAuthorId,(e,rows)=>{
        if(e){
            console.log(e)
        }
        else{
            author_id=rows[0].id
        }
    })


    console.log(author_id)
})

app.get("/",getHomePage)



app.listen(5000,(err)=>{
    if(err){
        throw err;
    }else{
        console.log("server is running on port 5000")
    }
})