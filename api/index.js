const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Import routes
const userRoute = require('./routes/user')

//Database connection
mongoose.connect("mongodb+srv://fullstacksk:fullstacksk@cluster0.6ghky.mongodb.net/TestDB?retryWrites=true&w=majority", () => {
    console.log("Connected to database sussessfully");
})

//Middleware
app.use(express.json());

//Apply Middleware
app.use('/api/user', userRoute);



app.listen(3000, console.log("Server running at port 3000"));