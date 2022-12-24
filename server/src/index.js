const express=require('express');
const cors=require('cors');
const dotevn = require('dotenv');
const app=express();
app.use(express.json());
app.use(cors());
dotevn.config({path : "../.env"});
const port=process.env.PORT;
require('./database/connection');
const logRouter = require("./routers/log-reg")
const form=require("./routers/form");
app.use('/', logRouter);
app.use('/',form);
app.listen(port,()=>{
    console.log("server is connected at "+port)
})