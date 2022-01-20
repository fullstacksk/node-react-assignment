const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

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
        res.send(savedUser);
    } catch (err) {
        console.log("Error : ",err)
        res.status(400).send({error:err.message});
    }
})

router.get('/login', (req, res) => {
    res.send(login);
})

module.exports = router;