const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register User
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password){
        res.status(400);
        throw new Error('Please add all fields');
    }

    // check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name,
        email,
        password : hashedPassword
    });

    if(user){
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email
        })
    } else {
        res.status(400);
        throw new Error ('Invalid User Data');
    }
})

// @desc    Authenticate User
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Log this muh fucka in'});
})

// @desc    Get User Data
// @route   GET /api/users/me
// @access  public
const getMe = asyncHandler(async (req, res) => {
    res.json({ message: "It's a me!  The head nigga in charge!"})
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}