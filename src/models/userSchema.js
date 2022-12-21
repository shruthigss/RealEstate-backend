const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const user=mongoose.model('signupdetails',userSchema);
module.exports=user;