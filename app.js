const express= require('express')
const app = express()


app.get('/',(req,res)=>{
res.send("Welcome to UCF")
}) 

app.listen(3000,()=>{
    console.log("Server Running...")
});

