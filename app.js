const express= require('express')
const app = express()


app.get('/',(req,res)=>{
res.send("Welcome to UCF")
}) 


const port = process.env.port||8081

app.listen(port,()=>{
    console.log("Server Running...")
});

