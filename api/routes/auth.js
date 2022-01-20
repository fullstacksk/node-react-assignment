const jwt = require('jsonwebtoken');

const verifyUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Access denied"})
    }
    try {
        const verfiedUser = jwt.verify(token, 'thisismyjwtsecret');
        req.user = verfiedUser;
        next();
    } catch (err) {
        res.status(400).send({error:"Invalid token"})
    }
}

module.exports = verifyUser;