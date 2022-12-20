const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routerUrls = require("./router.js")
const path = require("path");
const port = 3002 || process.env.DATABASE_CONNECTION;

//middlewares
app.use(express.json());
app.use(cors());
app.use("/app", routerUrls);

app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.urlencoded({extended:false}));

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
  });

  
//connection to db
mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DATABASE_CONNECTION,{useUnifiedTopology: true,useNewUrlParser: true},
    ()=>console.log("connected to db"))

app.listen(port, ()=>{console.log(`listening on port number ${port}`)});