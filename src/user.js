const express = require('express');
const router = express.Router();
const User = require('../models/User');

//gets all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.send(error)
  }
})

// gets one user based on username param
router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({"username": req.params.username})
    res.json(user)
  } catch (error) {
    res.send(error)
  }
})

// makes a new user
router.post('/', async (req, res) => {    
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    
  try{
    const newUser = await user.save()
    res.json(newUser)
  }catch(error){
    res.send(error)
  }
});

// update User
router.patch('/:userId', async (req,res) =>{
  try {
    const updatedUser = await User.updateOne({_id: req.params.userId}, {$set: {password: req.body.password}})
    res.json(updatedUser)
  } catch (error) {
    res.send(error)
  }
})


// delete user with id
router.delete('/:userId', async (req, res) =>{
  try{
    const remoovedUser = await User.remove({_id: req.params.userId});
    res.json(remoovedUser);
  }catch(error){
    res.send(error);
  }
})






module.exports = router;