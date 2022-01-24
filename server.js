const express= require('express')
const app = express()

const path=require('path')

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


app.use(express.static("public"));
app.set("view engine", "ejs");
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/signUpPage.html');
}) 

app.post('/signUpProcess', function(req, res){ // Specifies which URL to listen for
    // req.body -- contains form data
    var object = req.body;
    var sql = "insert into USERS(firstname,lastname,email,userPassword,userTypeID) Values ('"+object.firstNmeInput+"','"+object.lastNmeInput+"','"+object.emailInput+"','"+object.passwordInput+"',1)";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
console.log(JSON.stringify(req.body)+" ");
});

const port = process.env.PORT||8081
app.listen(port,()=>{
    console.log("Server Running...")
});

