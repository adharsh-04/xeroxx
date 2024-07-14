const exp=require('express');
const userApp=exp.Router();

userApp.get('/test',(req,res)=>{
    res.send({message:"request from user"});
})

//request handler for user registration process
userApp.post('/user',(req,res)=>{
    const body=req.body;
    console.log(body);
})
module.exports=userApp;