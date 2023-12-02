const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData; 
        if(token) {
            decodedData = jwt.verify(token, process.env.SECRET_KEY);
            req.userId = decodedData.id;
        }else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub
        }
        
    } catch (error) {
        console.log(error);
    }

    next();
}

module.exports = auth;