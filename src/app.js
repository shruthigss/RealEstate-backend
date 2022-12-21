const express=require("express")
const bodyparser=require('body-parser')
//const cors=require('cors')
const auth=require('./routes/authorization')
const property=require('./routes/properties')

const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use(auth);
app.use(property);

/* app.post('/property', async (req,res)=>{
    try{
         const data=await Property.create(req.body);
         res.json({
            message:"success",
            data
         })
    }
    catch(e){
           e.message
    }
}) */

module.exports=app;