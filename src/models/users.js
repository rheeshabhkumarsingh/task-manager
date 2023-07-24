const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const userModel = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})


userModel.statics.findByCredentials = async function (email, password) {
    let user = await User.findOne({email});
    if(!user) {
        throw new Error('User not found')
    }
    let passValid = await bcrypt.compare(password, user.password)
    if(!passValid) {
        throw new Error('User not found')
    }
}

const User = mongoose.model('User', userModel)

module.exports = { User }