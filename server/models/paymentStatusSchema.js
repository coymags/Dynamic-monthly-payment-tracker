const mongoose = require('mongoose')

const monthSchema = new mongoose.Schema({
  status: { type: String, enum: ['paid', 'unpaid', 'pending'], default: 'unpaid' },
  amount: { type: Number, default: 0 },
  paidDate: { type: Date, default: null }  // ✅ Date type, can be null
});


const paymentStatus = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    months:{
        "1":{type: monthSchema ,default:{}},
        "2":{type: monthSchema ,default:{}},
        "3":{type: monthSchema ,default:{}},
        "4":{type: monthSchema ,default:{}},
        "5":{type: monthSchema ,default:{}},
        "6":{type: monthSchema ,default:{}},
        "7":{type: monthSchema ,default:{}},
        "8":{type: monthSchema ,default:{}},
        "9":{type: monthSchema ,default:{}},
        "10":{type: monthSchema ,default:{}},
        "11":{type: monthSchema ,default:{}},
        "12":{type: monthSchema ,default:{}}
    }
})


module.exports = mongoose.model('Status', paymentStatus)