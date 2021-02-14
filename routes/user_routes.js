const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt')


router.post('/user/add',async function(req,res){

    let login=req.body.username;
    let pass=req.body.password;

    var hashPassword = async function(){
      var hashPwd = await bcrypt.hash(pass,10);
      return hashPwd
    }

  hashPassword().then((hashPwd)=>{
      payload={username:login,password:hashPwd}
      const newinstance = new Users(payload)
      newinstance.save()
      .then((d)=>{console.log('successfully added record')})
      .catch(()=>{console.log('unable to add record')})
  })
  .catch((err)=>{console.log(err)})
  
})

router.get('/user/registered',async function(req,res){


    let login=req.body.username;
    let pass=req.body.password;
    

    try{ 
     await Users.find({'username':login})
     .then((user)=>{
      //console.log(user) 
      let stored_hash = user.password
      let result = bcrypt.compare(pass,stored_hash).then((data,hash)=>{console.log(data + hash)}).catch((e)=>{console.log(e)})
      if(result)
      {console.log("match found"+result); res.send("true")}
      else
      {console.log("match not found")}
    })
     .catch((err)=>{
       console.log("error is"+err)
     })
    }
     catch(err){
         console.log(err)
     }






    // try{ 
    //      await Users.find({},function(err,order){
    //              res.json(order)
    //          });
    //  }
    //  catch(err){
    //      console.log(err)
    //  }
     
 });
 

module.exports = router;