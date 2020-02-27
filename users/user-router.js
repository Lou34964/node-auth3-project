const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, (req,res)=>{
  Users.findBy({ department: req.user.department})
    .then(list => res.status(200).send(list))
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
})

module.exports = router;