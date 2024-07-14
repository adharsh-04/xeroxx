const exp=require('express')
const adminApp=exp.Router();

adminApp.get('/admin',(req,res)=>{
    res.send({message:"request from admin"});
})
module.exports=adminApp;