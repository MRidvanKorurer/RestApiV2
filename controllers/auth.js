const {Auth} = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const auth = await Auth.create({username, email, password: hashedPassword});
        
        const token = jwt.sign({_id: id}, process.env.SECRET_KEY);

        res.status(200).json({
            status: "OK",
            auth,
            token
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}



const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const loginUser = await Auth.findOne({email});

        if(!loginUser) {
            return res.status(400).json({
                message: "email adresi hatalı"
            });
        }

        const matchedPassword = await bcrypt.compare(password, loginUser.password);

        if(!matchedPassword) {
            return res.status(400).json({
                message: "parola hatalı"
            });
        }

        const token =  jwt.sign({_id: id}, process.env.SECRET_KEY);


        res.status(200).json({
            status: "OK",
            loginUser,
            token
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

module.exports = {register, login};