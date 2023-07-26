const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser.js');
const JWT_SECRET = 'aslfkjsdflkjsaf'

//Route 1: Create a user using POST "/api/auth/createuser". No auth required
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {
  let success= false
  const errors = validationResult(req);
  if (!errors.isEmpty()) { // Check for errors in user input 
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email }) // Check if the user already exists 
  if (user) {
    return res.status(400).json({success, error: "Email already exists please login with this email" })
  }
  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(req.body.password, salt)
  user = await User.create({ // Create a new user
    name: req.body.name,
    email: req.body.email,
    password: secPass
  })
  const data = {
    user:{
      id: user.id
    }
  }
  const jwtData = jwt.sign(data, JWT_SECRET)
  console.log(jwtData)
  success = true
  // res.json({ user })
  res.send({success, jwtData})
  } catch (error) {
    res.status(500).json("Internal server error")
  }
})

//Route 2: Create a user using POST "/api/auth/login". No auth required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Cannot be blank').exists()
], async (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { // Check for errors in user input 
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let success = false
    let user = await User.findOne({email}); // find user in the database
    if(!user){
      return res.status(400).json({success, error:"Enter correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password) // compare the hash
    if(!passwordCompare){
      return res.status(400).json({success, error:"Enter correct credentials"});
    }

    const payload = {
      user: {
        id: user.id
      }
    }
  
    const jwtData = jwt.sign(payload, JWT_SECRET); // jwt auth
    success = true
    res.json({success, jwtData, user})
  } catch (error) {
    console.log(error.message)
    res.status(500).json("Internal server error")
  }

}
)

//Route 3: Get user details after login using POST : '/api/auth/getuser'. Login requried
router.post('/getuser',fetchuser, async (req,res) => {
try {
  const userid = req.user.id;
  const user = await User.findOne({userid}).select('-password')
  res.send(user)
} catch (error) {
  console.log(error.message)
  res.status(500).json("Internal server error")
}
})

module.exports = router