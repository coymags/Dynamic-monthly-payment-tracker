const User = require('../models/userSchema')// Schema for database connected to database
const Plan = require('../models/planSchema')
const Paid = require('../models/paymentSchema')
const Status = require('../models/paymentStatusSchema')

const bcrypt = require('bcrypt');// Password hashing library
const jwt = require('jsonwebtoken');

/*exports.getOneUser = (req, res) => {
    const userId = req.params.id
    console.log('Requested user ID: mo print sa terminal', userId)
}*/

// Generate token form process.env file
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

// User Login
exports.userLogin = async (req, res) => {
    try{
        
        const { username, password } = req.body;

        // Looking for username is already in the database
        const user = await User.findOne({username});

        // Condition if username is not in the database 'Failed to Login'
        if(!user){
            return res.status(401).json({message: 'Wrong username'});
        };

        // Matching input password and hashpassword from the database
        const isMatch = await bcrypt.compare(password, user.password);
        // If password is wrong send a response
        if(!isMatch){
            return res.status(401).json({message: 'Wrong password'});
        };

        // Response if user and password match( Sending response to frontend)
        //  It's the client email and username together with the json token
        res.json({
            _id:user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
        
    }catch(err){
        console.error(err)
    }
};

// User Registration 
exports.createUser = async (req, res) => {

    try{
        //deconstruction of req.body, To include user input
        const { firstname, lastname, address, birthday, age, email, username, password } = req.body;
        
        //Check database if email already exist
        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(401).json({messsage: 'Email already exist'});
        };

        //Password Hashing
        const salt = 10;
        const hashPassword =  await bcrypt.hash( password, salt);

        //Save form to database using create()
        const userInfo = await User.create({
            firstname,
            lastname,
            address,
            birthday,
            age,
            email,
            username,
            password: hashPassword
        })
            
        const plan = await Plan.create({
            user: userInfo._id,
            monthlyPrice: 100,
            startDate: new Date()
        })

        
        //user: {email, username}
            
        res.status(201).json({message: 'User registered succesfully', user :{ email, username }})
        
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Server error'})
    }
};

//Payment data being send to database
exports.paymentData = async (req, res) => {
    try {

        const {user, payment, payDate} = req.body
        const userPaid = await Paid.create({
            user,
            payment,
            payDate
        }) 

        res.json(req.body)

    } catch (error) {
        console.error(error)
    }
}

// Payment Status of the user
exports.paymentStatus = async (req, res) => {

    try {
        const { userId, year } = req.body

        const payStatus = await Status.create({
            userId,
            year
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: payStatus
        })
        console.log(userId)
        console.log(year)

    } catch (error) {
        console.error(error)
    }
}

//User profile or User data being fetch from the data base
exports.getUser = async (req, res) => {
    res.json(req.user)
}

exports.updateUser = (req, res) => {
    console.log('Update User')
}