const dotenv = require("dotenv")
dotenv.config({path:'./.env'})
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./config/dbconfig')
const session = require('express-session')

const setRoutes = require('./routes/routes')


const app = express()

//import middleware
const {bindUserWithRequest} = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals')

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
    res.render('auth/auth',{signupMode:true})
})

app.get("/",(req,res)=>{
    res.render('index')
})



app.listen(5000,(err)=>{
    if(err){
        throw err;
    }else{
        console.log("server is running on port 5000")
    }
})