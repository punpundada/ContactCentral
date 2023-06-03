const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken= asyncHandler(async (req , res , next)=>{
    //when ever a user sends a auth req he will send token in header section in auth field
    let token ;
    let authHeader = req.headers.authorization || req.headers.Authorization ;
    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1] // [0] will contain Bearer and second index will contain Token.
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
            if(err){
                res.status(401)
                throw new Error("User is not autorized")
            }
            //console.log(decoded)
            req.user = decoded.user;
            next();
        })
        if(!token){
            res.status(401);
            throw new Error("User is not autorized or token is missing");
        }
    }
    
})

module.exports = validateToken;