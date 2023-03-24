const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function (userName, email, password) {
    
    // validation
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        if (password.length < 8) {
            throw Error('Password must be 8 characters minimum')
        }
        else if (!(/[A-Z]/.test(password))) {
            throw Error('Password must contain Uppercase letters')
        }
        else if (!(/[a-z]/.test(password))) {
            throw Error('Password must contain lowercase letters')
        }
        else if (!(/\d/.test(password))) {
            throw Error('Password must contain numbers')
        }
        else if (!(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))) {
            throw Error('Password must contain a special character')
        }
        else {
            throw Error('Password is not strong enough')
        }
    }

    const exists = await this.findOne({email})
    if (exists) {
        throw Error('Email already Exists')
    }

    const salt = await bcrypt.genSalt(2)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({userName, email, password: hash})
    
    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if (!user) {
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)