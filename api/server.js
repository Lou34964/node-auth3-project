const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

//Routers
const authRouter = require('../auth/auth-router');
const userRouter = require('../users/user-router');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req,res)=>{
  res.send("Woohoo you made it!")
})

module.exports = server;