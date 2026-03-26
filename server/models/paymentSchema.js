const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payment: {
        type: Number,
        required: true
    },
    payDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    processed:{
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Paid', paymentSchema)