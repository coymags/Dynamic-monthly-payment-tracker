const mongoose = require('mongoose')

// Plan Schema for database
const planSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    monthlyPrice:{
        type: Number,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Plan', planSchema)