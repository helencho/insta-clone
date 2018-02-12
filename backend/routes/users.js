// Uncomment after pulling from Princess's branch 
// var db = require('../db/queries')
var express = require('express')
var router = express.Router()
const { loginRequired } = require('../auth/helpers') 
const passport = require('../auth/local')

router.get('/', db.getAllUsers)
router.get('/:id', db.getSingleUser) 

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user) 
})
router.post('/register', db.registerUser)

router.get('/logout', loginRequired, db.logoutUser) 

module.exports = router;
