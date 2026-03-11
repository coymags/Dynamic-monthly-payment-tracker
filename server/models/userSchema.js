const mongoose = require('mongoose');

// Create a user profile mongoose Schema ( Javascript object )
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        lowercase: true,
    },
    lastname:{
        type: String,
        required: true,
        lowercase: true,
    },
    address:{
        type: String,
        required: true,
        lowercase: true,
    },
    birthday:{
        type: Date,
        required: true,
    },
    age:{
        type: Number,
        min: 0,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlenght:10    
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});



//Sending schema to database
module.exports = mongoose.model('User', userSchema)