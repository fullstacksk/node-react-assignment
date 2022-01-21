const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Import routes
const userRoute = require('./routes/user')

//Database connection
mongoose.connect("mongodb+srv://fullstacksk:fullstacksk@cluster0.6ghky.mongodb.net/TestDB?retryWrites=true&w=majority", () => {
    console.log("Connected to database sussessfully");
})

//Middleware
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());

//Apply Middleware
app.use('/api/user', userRoute);



app.listen(3001, console.log("Server running at port 3000"));