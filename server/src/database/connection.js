const mongoose=require('mongoose');
const dotevn = require('dotenv');

dotevn.config({path : "../.env"});

mongoose.connect("mongodb+srv://realestate:3members@cluster0.httl522.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("connected to database")})
.catch((e)=>{console.log(e)})
