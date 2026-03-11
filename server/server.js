// To process.env file
require('dotenv').config();

// It starts here!!!
const express = require('express');

//cors Cross - Origin - Resource - Sharing
const cors = require('cors')

// Connect to express APP
const app = express();

app.use(cors()) // Any frontend can access localhost:3000


// This code is for specific frontend PORT only
//app.use(cors({
//    origin: 'http://localhost:5173', // This is the react PORT you only allowed
//    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
//}))

// Import mongoose
const mongoose = require('mongoose');

// Connect to the Database
mongoose.connect(process.env.DATABASE_URL);// You can view url in .env file
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database(Loginsystem) and Collection(users) '));

// Parser Incoming request with Json payload so data can be available
app.use(express.json());

// Connect routes to main application (Import router from user.js file)
const userRouter = require('./routes/users');
app.use('/users', userRouter); // ( '/user' will be the endpoint "Router shall handle request such as GET POST PATCH DELETE")


// Setup port


app.listen(process.env.PORT, () => {
    console.log(`Listening to port 3000`);
});



