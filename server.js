const express= require('express')
const app = express()

var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:process.env.HOST_NAME,
   user:process.env.DB_USERNAME,
   password:process.env.USER_PASSWORD,
   port:process.env.DB_PORT,
   database:process.env.DB_NAME
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = connection; 
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/signUpPage.html');
}) 


const port = process.env.PORT||8081
app.listen(port,()=>{
    console.log("Server Running...")
});

