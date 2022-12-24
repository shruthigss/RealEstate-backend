const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email:{type:String},
    password:{type:String},
    cpassword:{type:String}
})

const User= new mongoose.model("User",userSchema);

module.exports=User;