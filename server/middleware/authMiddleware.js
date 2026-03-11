const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    
    let token
    
    //Check if Authorization header exist
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            //Get token from header
            token = req.headers.authorization.split(' ')[1]
            
            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Attach user info to request
            //req.user = decoded This will get user information from the database
            req.user = await User.findById(decoded.id).select("-password")

            //move to the next, In the controller
            next()

        }catch(error){
            return res.status(401).json({message: 'Not authorize, token failed'})
        }
    }

    if(!token){
        return res.status(401).json({message: 'Not authorize, No token'})
    }
}

module.exports = protect