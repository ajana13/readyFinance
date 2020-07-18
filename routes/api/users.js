const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const User = require('../../model/User');

// ?
const key = require('../../config/keys').secret;

/**
 * @router POST api/users/register
 * @desc Register the user
 * @access Public
 */
router.post('/register', (req, res) => {
    let { name, username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Passwords do not match"
        });
    }
    // Check unique username
    User.findOne({ username: username }).then(user => {
        if (User) {
            return res.status(400).json({
                msg: "Username is already taken"
            });
        }
    });
    // Check unique email
    User.findOne({ email: email }).then(user => {
        if (User) {
            return res.status(400).json({
                msg: "Email already exists"
            });
        }
    });
    // Everything is fine, then data is valid. So, register the user
    let newUser = new User({
        name, username, password, email
    });
    // Hash our password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is now registered!"
                });
            });
        });
    });
});

/**
 * @router POST api/users/login
 * @desc Login the user
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Username is not found",
                success: false
            });
        }
        // If user is found, compare the password to make sure it matches
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        msg: "Hurray! You are now logged in"
                    })
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect Password",
                    success: false
                });
            }
        })
    })
});

/**
 * @router GET api/users/profile
 * @desc Return User's data
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user
    });
})

module.exports = router;
