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

app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(express.json())



app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/signUpPage.html');
}) 


app.post('/signUpProcess', function(req, res){ // Specifies which URL to listen for
    // req.body -- contains form data
console.log(req.body[0]+" ");
});


const port = process.env.PORT||8081
app.listen(port,()=>{
    console.log("Server Running...")
});

