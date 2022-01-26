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
  var JSONobject = { "Popular":[{ "eventTitle":"Breaking Bad", "eventImage":"https://occ-0-1433-1432.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUjsKDiaKwLmrV662pwmVKEtRmbJI-s8M9ojCqr2QEdnPUJPX86RP-n9IGXxGcaHWkTf-cwz5e4kBLN3jYLM7HuBfYA.webp?r=01d"  }],
                      "New":[{ "eventTitle":"Breaking Bad New", "eventImage":"https://occ-0-1433-1432.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUjsKDiaKwLmrV662pwmVKEtRmbJI-s8M9ojCqr2QEdnPUJPX86RP-n9IGXxGcaHWkTf-cwz5e4kBLN3jYLM7HuBfYA.webp?r=01d"  }]
        } 
  
 // const s = JSON.parse(JSONobject)
 // return res.status(422).jsonp(s.eventTitle);
// const d = s.array()
 JSONobject = getVideos();
     res.render('mainPlatform',{ lists:JSONobject});
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

function getVideos (){
  var sql = "SELECT e.eventId,c.categoryName,c.categoryID,e.eventName,e.eventLink,e.eventImageLink,e.eventdate,eventDescrip,ticketPrice,ratingCount FROM CREATOR_EVENT e INNER JOIN VIDEO_CAT c on e.categoryID=c.categoryID GROUP BY e.categoryID;";
  var returnObject ={}
  var arrayOFEvents =[]
  connection.query(sql, function (err, result) {
    var curCat = result[0].categoryID
    result.forEach(element => {
      if(curCat == element.categoryID)
      {
arrayOFEvents.push({ "eventTitle": element.eventName, "eventImage":element.eventImageLink  })
      }
      else
      {
        returnObject[curCat] = arrayOFEvents;
        arrayOFEvents=[];
        arrayOFEvents.push({ "eventTitle": element.eventName, "eventImage":element.eventImageLink  })
        curCat=element.categoryID;
      }
    });
    

  });

  return returnObject;
}

const port = process.env.PORT||8081
app.listen(port,()=>{
    console.log("Server Running...")
});

