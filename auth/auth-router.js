const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model');
const { jwtSecret } = require('../config/secrets');

router.post('/register', (req,res)=>{
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved =>{
      res.status(201).json(saved)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err)
    })
})

router.post('/login', (req,res) =>{
  let { username, password } = req.body;

  Users.findBy({username}).first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user);

        res.status(200).json({message:`Welcome ${username}`, Token: token})
      }
      else{
        res.status(401).json({ message: "Error: Username or password incorrect"})
      }
    })
    .catch(err =>{
      console.log(err)
      res.status(500).json(err);
    })
})

function generateToken(user) {
  const payload = {
    user
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;