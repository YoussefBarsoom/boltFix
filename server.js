const express= require('express')
const app = express()
const path=require('path')
const bodyParser = require('body-parser')
const {check,validationResult}=require('express-validator')
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
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(__dirname));

app.use(
    express.urlencoded({
      extended: true
    })
  )
app.use(express.json())



app.get('/SignUp',(req,res)=>{
    res.render('signUpPage');
}) 
app.get('/',(req,res)=>{
  const JSONobject = ' {  "eventTitle":"Breaking Bad", "eventImage":"https://occ-0-1433-1432.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUjsKDiaKwLmrV662pwmVKEtRmbJI-s8M9ojCqr2QEdnPUJPX86RP-n9IGXxGcaHWkTf-cwz5e4kBLN3jYLM7HuBfYA.webp?r=01d"   } '
  
  const s = JSON.parse(JSONobject)
 // return res.status(422).jsonp(s.eventTitle);
// const d = s.array()
    res.render('mainPlatform',{ lists:s});
}) 

app.post('/signUpProcess',[
  check('passwordInput','Pasword must be 8+ characters long').exists().isLength({min:8}),
  check('emailInput','Email is invalid').isEmail().normalizeEmail(),
  check('firstNmeInput','First Name cannot be empty').exists().isLength({min:1}),
  check('lastNmeInput','Last Name cannot be empty').exists().isLength({min:1})
], function(req, res){ // Specifies which URL to listen for
    // req.body -- contains form data

    const error= validationResult(req)
    if(!error.isEmpty())
    {
      const alert = error.array()
      res.render('signUpPage',{
        alert
      })
    }
    else{

    
    var object = req.body;
    var sql = "insert into USERS(firstname,lastname,email,userPassword,userTypeID) Values ('"+object.firstNmeInput+"','"+object.lastNmeInput+"','"+object.emailInput+"','"+object.passwordInput+"',1)";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    console.log(JSON.stringify(req.body)+" ");
  }
});



const port = process.env.PORT||8081
app.listen(port,()=>{
    console.log("Server Running...")
});

