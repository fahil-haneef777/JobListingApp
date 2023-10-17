const jwt = require("jsonwebtoken");

const verifyjwt = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return res.status(401).send({ message: "Unauthorized user" });
    }
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if(!decode){
        return res.status(401).send({message:'invalid token'})
    }
    next();
  } catch (error) {
    console.log(error);
  }
};


module.exports=verifyjwt