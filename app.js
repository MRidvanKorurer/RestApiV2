const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db");
const authRoute = require("./routes/auth");

dotenv.config();


const app = express();

const port = process.env.PORT;

//! middlewares
app.use(express.json());
app.use("/", authRoute);


conn();
app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
});