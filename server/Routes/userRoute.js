const express = require('express')
const router = express.Router();
const model = require('../model/UserModal')
const {body, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const bcrypt = require("bcrypt")
const jwtsecret = "hellojikyahaalhaapke"

router.post('/createuser',
[
    body("email").isEmail(),
    body("username").isLength({min: 6}),
    body("password", "Incorrect Password").isLength({min: 6})
], 
async(req, res) => {

    const error = validationResult(req)
    const email = req.body.email;
    console.log(req.body)
    console.log(email)
    const data = await model.findOne({email});
    console.log(data)
    if (!error.isEmpty()) {
        return res.status(402).json({ errors: error.array() });
    }
    try {

        if(!data){
            let salt = bcrypt.genSaltSync(10);
            const setPassword = await bcrypt.hash(req.body.password, salt)
            await model.create({
                email: req.body.email,
                username: req.body.username,
                password: setPassword
            })
            res.status(201).json({success: true})
        }else{
            return res.json({status: false, messsage:"Email already exist"})
        }
        
    } catch (error) {
        console.log("the error is: ", error)
        res.json({success: false})
    }
}
)

router.post(
    "/loginuser",
    async (req, res) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      let username = req.body.username;
  
      try {
        let userData = await model.findOne({ username });
        if (!userData) {
          return res.status(400).json({ errors: "use correct credentials" });
        }
  
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
  
        if (!pwdCompare) {
          return res.status(400).json({ errors: "use correct credentials" });
        }
  
        const data = {
          user:{
            id:userData.id
          }
        }
        const authToken = jwt.sign(data,jwtsecret)
        // const id = userData._id;
        return res.json({ success: true,authToken:authToken });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    }
  );


module.exports = router