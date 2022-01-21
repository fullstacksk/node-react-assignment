const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyUser = require('./auth');

// Register User
router.post('/register', async (req, res) => {
    const {name, email,role, age, mobile, password } = req.body;
    try {
        //Preventing user duplication
        const userExists = await  User.findOne({email});
        console.log("userExists :",userExists);
        if(userExists){
            return res.status(400).send({error:"User exists already"});
        }

        //Hashing Password
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ name, email,role, age, mobile, password:hashedPassword });
    
        const savedUser = await user.save();
        res.send({...savedUser._doc,password:undefined});
    } catch (err) {
        console.log("Error : ",err)
        res.status(400).send({error:err.message});
    }
})

// Create User
router.post('/',verifyUser, async (req, res) => {
    const {name, email,role, age, mobile, password } = req.body;
    try {
        //Preventing user duplication
        const userExists = await  User.findOne({email});
        console.log("userExists :",userExists);
        if(userExists){
            return res.status(400).send({error:"User exists already"});
        }

        //Hashing Password
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ name, email,role, age, mobile, password:hashedPassword });
    
        const savedUser = await user.save();
        res.send({...savedUser._doc,password:undefined});
    } catch (err) {
        console.log("Error : ",err)
        res.status(400).send({error:err.message});
    }
})

//Login User
router.post('/login', async (req, res) => {
    const {email,password} = req.body;
    try {
        
    // Checking User availability
    const user = await User.findOne({email})
    if(!user)
        return res.status(400).send({error:"Invalid email/password"});
    //Matching Password
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid)
            return res.status(400).send({error:"Invalid password/email"});
    
    //JWT Token
    const token = jwt.sign({_id:user._id,role:user.role},"thisismyjwtsecret")
        res.header('auth-token',token).send({accessToken : token});
    } catch (err) {
        res.status(500).send({error:err.message});
    }
})

//Get All User
router.get('/', verifyUser , async(req, res)=>{
    try {
        const users = await User.find({}).select("-password");
        if(!users.length){
            return res.status(500).send({error:"User not found"});
        }
        res.status(200).send(users);
    } catch (err) {
        // console.log(err);
        res.status(500).send({error:err.message});
    }
})

//Update User
router.put("/:id",verifyUser, async (req,res)=>{
    // console.log(req.body,req.params.id);
    const {name,age,mobile}=req.body;
    try {
        // const user = await User.findOne({_id:req.params.id});
        // console.log(user);
        const updatedUser =await User.findByIdAndUpdate(req.params.id,{name,age,mobile},{new:true}).select("-password");
        if(!updatedUser)
            return res.status(400).send({error:"User doesn't exist"});
        res.status(201).send(updatedUser);
    } catch (err) {
        // console.log(err);
        res.status(500).send({error:err.message});
    }
})

//Delete User
router.delete("/:id",verifyUser,async (req,res)=>{
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id}).select("-password");
        if (!user) {
            return res.status(404).send({error: "User doesn't exist"})
        }
        res.send(user)
    } catch (err) {
        res.status(500).send({error:err.message});
    }
})

module.exports = router;