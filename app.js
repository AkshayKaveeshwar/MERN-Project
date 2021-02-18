require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");  //this is for middleware
const cookieParser = require("cookie-parser");  //this is for middleware
const cors = require("cors");  //this is for middleware

//My routes
const authRoutes = require("./routes/auth"); //for router and here inside routes there is auth.js is there and it is own created route that is why we gave ./routes/auth
const userRoutes = require("./routes/user"); //same as above line but here user.js

//DB CONNECTION
//In below there is DATABASE, it is actually created separate file called .env and took from that file.
//Reason for saying this line is because .env file dont get uploaded on github/repo server usually. 
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DB CONNECTED");
});

//Middlewares
app.use(bodyParser.json());  //for middleware
app.use(cookieParser());    //for middleware
app.use(cors());            //for middleware

//My Routes
app.use("/api", authRoutes); //when we're running url that time /api should be there in before.
app.use("/api", userRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})