const jwt= require("jsonwebtoken"); 
require("dotenv").config();

const auth= async (req, res, next) => {
     try {

let token = req?.headers?.authorization;

// check is token is present in headers.

if (!token) {

return res.status(401).json({ message: "Not authorized!" });

}
//  token= req.headers.authorization.split(" ")[1];
token= req.headers.authorization

// verify token;
 const isTokenValid = await jwt.verify(token,'masai');

if (!isTokenValid) {

return res.status(401).json({ message: "Not authorized!" });

} 
req.body.userId = isTokenValid.userId;

next();

} catch (error) {

console.log(error); 
return res

.status(500)

.json({ message: "Something went wrong, please try again.",error:error.message });

}

};

module.exports =
{
    auth
}


// const jwt = require("jsonwebtoken");

// const auth=(req,res,next)=>{
//     const token = req.headers.authorization;
//     if(token)
//     {
//         const decoded = jwt.verify(token, "masai");
//         if(decoded)
//         {
//             req.body.userId=decoded.userId; 
//             next();
//         }
//         else{
//             res.status(400).send({ msg: "please provide correct token" });
//         }
//     }
//     else{
//         res.status(401).send({ msg: "please provide the token" });
//     }
// }
// module.exports = {
//     auth
//   };
  