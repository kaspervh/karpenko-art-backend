const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// create new user with encrypted password
// makes a new user
router.post('/signup', async (req, res) => { 
	
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	const user = new User({
		username: req.body.username,
		password: hashPassword,
	})
    
  try{
    const newUser = await user.save()
    res.json(newUser)
  }catch(error){
    res.send(error)
  }
});


router.post('/login', async (req, res) => {
	console.log('getting request')
	const userName = req.body.username;
	const password = req.body.password;

	console.log(userName)
	
	const user = await User.findOne({"username": userName});
	if(!user) res.send({message: 'user not found'});

	const validPass = await bcrypt.compare(password, user.password);
	if(!validPass) res.send({message: 'Password is invalid'});

	const token =  jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
	console.log(token)

	res.header('auth-token', token).send({ token: token, id: user._id, message: 'user is logged in'})
})

module.exports = router;