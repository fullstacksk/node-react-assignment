const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyUser = require('./auth');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

/* File Upload Default Settings */

/* File Storage Settings */
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});

/* File Filter Settings */
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Register User
router.post('/register', upload.single('avatar'), async (req, res) => {
    const { name, email, role, age, mobile, password } = req.body;
    if (!req.file) {
        const error = new Error("No Image Found");
        error.statusCode = 422;
        throw error;
    }

    const avatar = req.file.path.replace(/\134/g,"/");
    // console.log(req.file.path,avatar);
    try {
        //Preventing user duplication
        const userExists = await  User.findOne({email});
        console.log("userExists :",userExists);
        if(userExists){
            return res.status(400).send({error:"User exists already"});
        }

        //Hashing Password
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ name, email,role, age, mobile, password:hashedPassword ,avatar});
    
        const savedUser = await user.save();
        console.log("saved user : ",savedUser);
        res.send({...savedUser._doc,password:undefined});
    } catch (err) {
        console.log("Error : ",err)
        res.status(400).send({error:err.message});
    }
})

// Create User
router.post('/',verifyUser, upload.single('avatar'), async (req, res) => {
    const {name, email,role, age, mobile, password } = req.body;
    if (!req.file) {
        const error = new Error("No Image Found");
        error.statusCode = 422;
        throw error;
    }

    const avatar = req.file.path.replace(/\134/g,"/");
    try {
        //Preventing user duplication
        const userExists = await  User.findOne({email});
        console.log("userExists :",userExists);
        if(userExists){
            return res.status(400).send({error:"User exists already"});
        }

        //Hashing Password
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ name, email,role, age, mobile, password:hashedPassword,avatar });
    
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
        
    //Stricting login to admin only    
    if(user.role !== 'ADMIN')
        return res.status(400).send({error:"Insufficient privilages"});
        
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
router.put("/:id",verifyUser, upload.single('avatar'), async (req,res)=>{
    // console.log(req.body,req.params.id);
    const { name, age, mobile } = req.body;
    let avatar = "";
    if (req.file) {
        avatar = req.file.path.replace(/\134/g, "/");
    }

    const dataToBeUpdated = !!avatar ?  {name, age, mobile, avatar}: { name, age, mobile };
    try {
        // const user = await User.findOne({_id:req.params.id});
        // console.log(user);
        const updatedUser =await User.findByIdAndUpdate(req.params.id,dataToBeUpdated,{new:true}).select("-password");
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
        const isAdmin = await User.findOne({ _id: req.params.id, role: 'ADMIN' });
        if (isAdmin) {
            return res.status(404).send({error: "Insufficient previlages"})
        }
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