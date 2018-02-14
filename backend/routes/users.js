var db = require('../db/queries')
var express = require('express')
var router = express.Router()
const { loginRequired } = require('../auth/helpers')
const passport = require('../auth/local')


// User information functions 
router.get('/', db.getAllUsers)
// router.get('/u/:username', db.getSingleUser)
router.get('/u/:id', db.getSingleUserID)
router.patch('/u/:username', db.updateSingleUser)
router.get('/u/:id/following', db.getUserFollowing)
router.get('/u/:id/followers', db.getUserFollowers) 
router.get('/u/:id/photos', db.getAllPhotosFromSingleUser)
router.get('/p', db.getAllPhotos)
router.get('/p/:id', db.getSinglePhoto)
router.get('/p/:id/details', db.getPhotoDetails)

// User authentication functions 
router.post('/login', passport.authenticate('local'), (req, res) => res.json(req.user))
router.post('/new', db.registerUser)
router.get('/logout', loginRequired, db.logoutUser)

module.exports = router;
