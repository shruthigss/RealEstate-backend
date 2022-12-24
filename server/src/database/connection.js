const mongoose=require('mongoose');
const dotevn = require('dotenv');

dotevn.config({path : "../.env"});

mongoose.connect(process.env.URL)
.then(()=>{console.log("connected to database")})
.catch((e)=>{console.log(e)})