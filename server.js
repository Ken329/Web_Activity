const express = require('express')
const app = express()
var mysql = require('mysql')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator');
var session = require('express-session')
var flush = require('connect-flash');
const e = require('express');
const port = 3000
var username;

app.use(express.static('static'));
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 600000},
    resave: false,
    saveUninitialized: false
}))
app.use(flush())

//set view
app.set('views', './view')
app.set('view engine', 'ejs')

const urlEncode = bodyParser.urlencoded({extended: false})

app.get('', (req, res) => {
    res.render('login')
})
app.get('/index', (req, res)=>{
    res.render('index')
})
app.get('/signUp', (req, res)=>{
    res.render('signUp')
})

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'activity'
});

connection.connect(function(err){
    if(err) throw err;

    console.log('Connected ...')
})

const dbService = require('./static/js/dbService')

// login
app.post('/login', urlEncode, (req, res)=>{
    var user = req.body.login_username
    var pass = req.body.login_password

    var sql = "select user_name, user_password from user where user_name = '"+user+"' AND user_password = '"+pass+"'" ;
    connection.query(sql, function(err, result){
        if(err) throw err
        if(result == ""){
            res.send('Wrong username or password, please check')
        }else{
            username = user
            res.render('index')
        }
    })
})
// signup
app.post('/new_user', urlEncode, (req, res)=>{
    var user = req.body.signUp_username
    var pass = req.body.signUp_password
    var conPass = req.body.signUp_conPass
    var age = req.body.signUp_age
    if(pass != conPass){
        res.send("Password is not the same")
    }else if(user == "" || pass == "" || conPass == "" || age == ""){
        res.send("Do not leave any field empty")
    }else{
        var sql = "insert into user(user_id, user_name, user_password, user_age)values(null, '"+user+"', '"+pass+"', '"+age+"')"
        connection.query(sql, function(err){
            if(err)throw err
            res.render('login')
        })
    }
})
// logout
app.post('/logout', urlEncode, (req, res)=>{
    res.render('login')
})
// get all data for home page
app.get('/getAll', urlEncode, (req, res)=>{
    const db = dbService.getDbServiceInstance()

    const result = db.getAllData()
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err))
})
//get all data for post page
app.get('/getPostData', urlEncode, (req, res)=>{
    const db = dbService.getDbServiceInstance()

    const result = db.getPostData(username)
    result
    .then(data => res.json({data : data}))
    .catch(err => console.log(err))
})
// inserting post data
app.post('/inserting/:activity', urlEncode, (req, res)=>{
    const {activity} = req.params
    
    const db = dbService.getDbServiceInstance()

    const result = db.insertPost(activity, username)
    result
    .then(data => res.json({success : data}))
    .catch(err => console.log(err))
})
// deleting post data
app.delete('/delete/:id', urlEncode, (req, res)=>{
    const {id} = req.params
    const db = dbService.getDbServiceInstance()

    const result = db.deletePost(id)
    result
    .then(data => res.json({success: data}))
    .catch(err => console.log(err))
})
// altering post data
app.patch('/update', urlEncode, (req, res)=>{
    const id = req.query.id
    const name = req.query.name
    const db = dbService.getDbServiceInstance()

    const result = db.updatePost(id, name)

    result
    .then(data => res.json({success : data}))
    .catch(err => console.log(err))
})

app.listen(port, () => console.info('Listening in port ${port}'))