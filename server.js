const express = require('express')
const app = express()
var mysql = require('mysql')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator');
var session = require('express-session')
var flush = require('connect-flash');
const e = require('express');
const port = 3000

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
app.post('/inserting', urlEncode, (req, res)=>{
    var sql = "insert into activity(activity_id, activity_name)values(null, '"+req.body.activity+"')";
    connection.query(sql, function(err){
        if(err) throw err;
        res.render('index', {title: 'Data Saved',
        message: 'Data Saved Successfully'})
    })
    connection.end()
})
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
app.post('/login', urlEncode, (req, res)=>{
    var user = req.body.login_username
    var pass = req.body.login_password

    var sql = "select user_name, user_password from user where user_name = '"+user+"' AND user_password = '"+pass+"'" ;
    connection.query(sql, function(err, result){
        if(err) throw err
        if(result == ""){
            res.send('Wrong username or password, please check')
        }else{
            res.render('index')
        }
    })
})

app.listen(port, () => console.info('Listening in port ${port}'))