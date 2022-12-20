const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    email:{
        type:String, 
        required:true
    },
    password:{
        type:String, 
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const signup = mongoose.model("signupdetails", signupSchema);

module.exports = signup;