const express = require("express");
const {register, login} = require("../controllers/auth");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);

router.post("/login",auth, login);

module.exports = router;