const jwt = require("jsonwebtoken");

module.exports = (token) => {
    const verification = jwt.verify(token,process.env.secret_key);
    if(verification){
        return verification;
    }
    else{
        return null;
    }
} 