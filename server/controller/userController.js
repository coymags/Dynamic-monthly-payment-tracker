require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/userSchema')// Schema for database connected to database
const Plan = require('../models/planSchema')
const Paid = require('../models/paymentSchema')
const Status = require('../models/paymentStatusSchema')


const bcrypt = require('bcrypt');// Password hashing library
const jwt = require('jsonwebtoken'); // JsSOBWEBTOKEN

//Paymongo
const paymongo = require('../.api/apis/paymongo')
//Axios
const axios = require('axios')
const { redirect } = require('react-router-dom')

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

        const {user, payment} = req.body
        console.log("payment data ni sya ", user, payment)
        const userPaid = await Paid.create({
            user,
            payment
        }) 

        res.json(req.body)

    } catch (error) {
        console.error(error)
    }
}

// Payment reciept GET request from the user Update what quarter, first year and update database
exports.latestPayment = async (req, res) => {
    try {
        console.log("useEffect runs @", new Date())
        const {userId, thisYear, date} = req.query
        
        const latestPayment = await Paid.findOne({user: userId}).sort({ payDate: -1}) 

        res.json(latestPayment)

        //Payment amount also the paidDate
        const paidDate = latestPayment.payDate
        const amount = latestPayment.payment
        //Extract payDate in Day, Month, Year
        const dateObj = new Date(latestPayment.payDate)
        const paymentDat = dateObj.getUTCDay()
        const paymentMonth = dateObj.getUTCMonth() + 1
        const paymentYear = dateObj.getUTCFullYear()

        //This date is the date when the user first login of the web app
        const firstLogin = new Date(date)
        const firstLoginDay = firstLogin.getUTCDay()
        const firstLoginMonth = firstLogin.getUTCMonth() + 1
        const firstLoginYear = firstLogin.getUTCFullYear()

        try {

            //This is only to update 1 month for 100pesos
            //The final is divide payment into months. Ex: 500pesos payment will update 5 months including previos unpaid months
            const paymentUpdate = await Status.findOne({
                    userId: userId,
                    year: thisYear
                }
            )
            
            
            if(firstLoginYear == thisYear && 8 >= 7){

                //Divide amount into how many months it will cover(The answer will be How many months will update)
                let dividedAmount = amount / 100
                let monthUpdated = 0

                //This loop start fron 7 to 12. It is the second quarter of the year
                for(let i = 7;i <= 12; i++){

                    // Condition to stop the loop when the dividedAmount reach zero. 
                    if(monthUpdated >= dividedAmount){
                        break
                    }

                    // Condition to catch all the unpaid months
                    if(paymentUpdate.months[i].status === 'unpaid'){
                        
                        paymentUpdate.months[i].status = 'paid'
                        paymentUpdate.months[i].amount = 100
                        paymentUpdate.months[i].paidDate = new Date()
                        
                        
                        monthUpdated++
                    }

                }

                await paymentUpdate.save()

            }else{
                console.log("Diri tibuok tuig na bayaran")
            }
            
            
        } catch (error) {
            console.error(error)
        }

    } catch (error) {
        console.error(error)
    }
}

// Payment Status of the user
exports.paymentStatus = async (req, res) => {

    try {
        const { userId, thisYear } = req.body

        const payStatus = await Status.create({
            userId,
            year: thisYear
        })

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: payStatus
        })

    } catch (error) {
        console.error(error)
    }
}


//Get status of the user for checking
exports.getStatus = async (req, res) => {
    const { userId, thisYear } = req.query

    const response = await Status.findOne({
        userId,
        year: thisYear
    })
    
    res.json(response)
}

//User profile or User data being fetch from the data base
exports.getUser = async (req, res) => {
    res.json(req.user)
}

exports.updateUser = (req, res) => {
    console.log('Update User')
}

