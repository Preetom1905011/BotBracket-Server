const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '6h'})
}

// login user
const loginUser = async (req, res) => {
    
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        const {userName} = user

        // create a token
        const token = createToken(user._id)

        res.status(200).json({userName, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// signup user
const signupUser = async (req, res) => {

    const {userName, email, password} = req.body

    try {
        const user = await User.signup(userName, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({userName, token, _id: user._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get all the user ids
const getUsers = async (req, res) => {

    const user = await User.find({}, {_id: 1, userName: 1}).sort({createdAt: -1})
    res.status(200).json(user)
}


module.exports = {signupUser, loginUser, getUsers}