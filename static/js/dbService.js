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
    async getUserData(name){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from user where user_name = '"+name+"'"
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
    async updateUser(id, name, pass, age){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "update user set user_id = ?, user_password = ?, user_age = ? where user_name = ?"
    
                connection.query(query, [id, pass, age, name], (err, result)=>{
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
    async getMemberData(){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select user_id, user_name, user_age from user"
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
    async insertPost(activity, name){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "insert into activity(post_name, post_activity, post_id)values(?, ?, ?)"
    
                connection.query(query, [name, activity, null], (err, result)=>{
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
    async deletePost(id){
        try{
            id = parseInt(id, 10)
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
    async updatePost(id, name){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "update activity set post_activity = ? where post_id = ?"
    
                connection.query(query, [name, id], (err, result)=>{
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