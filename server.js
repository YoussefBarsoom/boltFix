const express= require('express')
const app = express()


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/signUpPage.html');
}) 


const port = process.env.PORT||8081
app.listen(port,()=>{
    console.log("Server Running...")
});

