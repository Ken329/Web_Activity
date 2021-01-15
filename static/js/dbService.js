const { response } = require('express');
const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
let instance = null
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'activity'
});

connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log('db ' + connection.state)
    }
})

class dbService{
    static getDbServiceInstance(){
        return instance ? instance : new dbService()
    }

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from activity;"
                connection.query(query, (err, result)=>{
                    if(err) throw err
                    resolve(result)
                })
            })
            return response;
        }catch(error){
            console.log(error)
        }
    }
    async getPostData(name){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from activity where post_name = '"+name+"'"
                connection.query(query, (err, result)=>{
                    if(err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
        }
    }
    async deletePost(id){
        id = parseInt(id, 10)
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "delete from activity where post_id = ?"
    
                connection.query(query, [id], (err, result)=>{
                    if(err) throw err   
                    resolve(result.affectedRows);
                })
            })
            return response === 1 ? true : false
        }catch(error){
            console.log(error)
            return false
        }
    }
}

module.exports = dbService;