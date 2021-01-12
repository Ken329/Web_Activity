const express = require('express')
const app = express()
var mysql = require('mysql')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator');
const port = 3000

app.use(express.static('static'));
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))

//set view
app.set('views', './view')
app.set('view engine', 'ejs')

const urlEncode = bodyParser.urlencoded({extended: false})

app.get('', (req, res) => {
    res.render('index')
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
    var sql = "insert into new_activity(id, post_activity)values(null, '"+req.body.activity+"')";
    connection.query(sql, function(err){
        if(err) throw err;
        res.render('index', {title: 'Data Saved',
        message: 'Data Saved Successfully'})
    })
    connection.end()
})
app.listen(port, () => console.info('Listening in port ${port}'))