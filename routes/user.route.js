const router = require('express').Router();
const bcrypt = require('bcryptjs');
const userSchema = require('../models/user.model');
const authorize = require('../libs/utils');

//sign_up
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const newUser = new userSchema({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash,
            designation: req.body.designation,
            mobileNo: req.body.mobileNo
        });
        newUser.save()
            .then((user) => {
                res.status(201).json({success: true, message: 'User registered successfully', result: user});
            })
            .catch((err) => {
                res.status(500).json({success: false, error: err})
            }) 
    })
})

//signin
router.post('/signin', (req, res, next) => {
    let getUser;
    userSchema.findOne({email: req.body.email})
        .then((user) => {
            if(!user) {
                res.status(401).json({success: false, message: 'Could not found the user'});
            }
            getUser = user;
            return bcrypt.compare(req.body.password, getUser.password)
        })
        .then((response) => {
            if(response) {
                const jwt = authorize.issueJWT(getUser);
                res.status(200).json({success: true, result: getUser, token: jwt.token, expiresIn: jwt.expiresIn});
            } else {
                res.status(401).json({success: false, message: 'incorrect email or password!1!'});
            }
        })
})

//users
router.get('/users', authorize, (req, res, next) => {
    userSchema.find((err, data) => {
        if(err) {
            return next(err);
        } else {
            res.status(200).json({success: true, result: data});
        }
    })
})

//get a user by id
router.get('/user-profile/:id', authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.status(200).json({success: true, result: data})
        }
    })
})

//update user
router.put('/update-user/:id', authorize, (req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
        if(err) { 
            return next(err);
        } else {
            res.status(200).json({success: true, message: 'user updated successfully', result: data});
        }
    })
})

//delete user
router.delete('/delete-user/:id', authorize, (req, res, next) => {
    userSchema.findByIdAndDelete(req.body.id, (err, data) => {
        if(err) {
            return next(err);
        } else {
            res.status(200).json({success: true, message: 'user deleted successfullu', result: data});
        }
    })
})

module.exports = router;