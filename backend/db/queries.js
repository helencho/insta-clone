const pgp = require('pg-promise')({})
const db = pgp('postgres://localhost/instaclone')
const authHelpers = require('../auth/helpers')
const passport = require('../auth/local')

// Information on all users 
function getAllUsers(req, res, next) {
    db.any('SELECT * FROM users')
        .then((data) => {
            console.log("data:", data)
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved all users'
            })
        })
        .catch((err) => {
            return next(err)
        })
}

// Information on the single user, including username and password 
// function getSingleUser(req, res, next) {
//     db.one('SELECT * FROM users WHERE username=$1', [req.params.username])
//         .then(data => {
//             res.status(200).json({
//                 status: 'Success',
//                 data: data,
//                 message: 'Retrieved one user'
//             })
//         })
//         .catch(err => {
//             return next(err)
//         })
// }

//Updating a single user's username, email, full name, profile ic, and user description
function updateSingleUser(req, res, next) {
    db
    .none('UPDATE users SET users.username = ${username}, users.email_add = ${email_add}, users.fullname = ${fullname}, users.profile_pic = ${profile_pic}, users.user_description = ${user_description} WHERE users.username = ${username}',
      req.body)
      .then(function (data) {
          console.log("data:", data, "req.body:", req.body)
        res.status(200)
          .json({
            status: 'success',
            message: 'Changed one user'
          });
      })
      .catch(function (err) {
          console.log(`backennd err`,err)
        return next(err);
      });
  }
  //Get all the photos from a single user
  function getAllPhotosFromSingleUser(req, res, next){
      db.any('SELECT users.user_id, photos.photo_id FROM users JOIN photos ON users.user_id =            photos.user_id WHERE users.user_id = $1', 
        [req.params.id])
        .then(data => {
        console.log("Data from backend single user photo:", data)
        res.status(200)
        .json({
            status: 'Success',
            data: data,
            message: 'Retrieved the selected users photos'
        })
    })
        .catch(err => {
        return next(err)
    })
  }

  //get a user by userid
function getSingleUserID(req, res, next) {
    db.one('SELECT * FROM users WHERE user_id = $1', 
    [req.params.id])
        .then(data => {
            console.log("Data from backend single user:", data)
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved the selected user'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on the users that current user follows including username and full name (based on current user ID)
function getUserFollowing(req, res, next) {
    db.any('SELECT user_following.user_id, user_following.following_id, users.username, users.fullname, users.profile_pic FROM user_following JOIN users ON user_following.following_id=users.user_id WHERE user_following.user_id=$1;',
        [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved user following details'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on the users that follow current user (based on current user ID)
function getUserFollowers(req, res, next) {
    db.any('SELECT user_followers.user_id, user_followers.follower_id, users.username, users.fullname, users.profile_pic FROM user_followers JOIN users ON user_followers.follower_id=users.user_id WHERE user_followers.user_id=$1',
        [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved user following details'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on all photos
function getAllPhotos(req, res, next) {
    db.any('SELECT * FROM photos')
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved all photos'
            })
        })
        .catch((err) => {
            return next(err)
        })
}

// Information on photo, including caption and image url 
function getSinglePhoto(req, res, next) {
    db.one('SELECT photos.photo_id, photos.photo_link, photos.caption, users.user_id, users.username, users.fullname, users.profile_pic FROM photos JOIN users ON users.user_id=photos.user_id WHERE photos.photo_id=$1',
        [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved one photo'
            })
        })
        .catch(err => {
            return next(err)
        })
}

// Information on users who liked the photo 
function getPhotoDetails(req, res, next) {
    db.any('SELECT photos.photo_id, users.user_id AS liked_by_user_id, users.username, users.profile_pic FROM photos JOIN likes ON photos.photo_id=likes.photo_id JOIN users ON likes.user_id=users.user_id WHERE photos.photo_id=$1;',
        [req.params.id])
        .then(data => {
            res.status(200).json({
                status: 'Success',
                data: data,
                message: 'Retrieved photo details'
            })
        })
        .catch(err => {
            return next(err)
        })
}


// function loginUser(req, res, next) {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             res.status(500).json({
//                 status: 'login error'
//             })
//         } else if (!user) {
//             res.status(404).json({
//                 status: 'User not found'
//             })
//         } else if (user) {
//             req.logIn(user, (err) => {
//                 if (err) {
//                     res.status(500).send('error')
//                 } else {
//                     res.status(200).send(user)
//                 }
//             })
//         }
//     })(req, res, next)
// }

// Registers user using email, username, password, fullname 
function registerUser(req, res, next) {
    let hash = authHelpers.createHash(req.body.password)
    db.none('INSERT INTO users (username, password_digest, email_add, fullname) VALUES ($1, $2, $3, $4)',
        [req.body.username, hash, req.body.email, req.body.fullname])
        .then(() => {
            res.status(200).json({
                message: 'Registration successful'
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'Error',
                error: err
            })
        })
}


function logoutUser(req, res, next) {
    req.logout()
    res.status(200).json({
        status: 'success',
        message: 'Logged out user'
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    // getSingleUser: getSingleUser,
    updateSingleUser: updateSingleUser,
    getUserFollowing: getUserFollowing,
    getUserFollowers: getUserFollowers,
    getAllPhotos: getAllPhotos,
    getSinglePhoto: getSinglePhoto,
    getAllPhotosFromSingleUser: getAllPhotosFromSingleUser,
    getPhotoDetails: getPhotoDetails,
    getSingleUserID: getSingleUserID, 
    // loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser
}