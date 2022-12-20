const mongoose = require("mongoose");
const schema = mongoose.Schema
const objectId = schema.objectId;


const propertyDetailsSchema = new mongoose.Schema({
    Property_type:{
        type:String, 
        required:true
    },
    Negotable:{
        type:String, 
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    OwnerShip:{
        type:String,
        required:true
    },
    Property_age:{
        type:String,
        required:true
    },
    Property_Approved:{
        type:String,
        required:true
    },
    Property_Description:{
        type:String
    },
    Bank_loan:{
        type:String,
        required:true
    },
    Length:{
        type:Number,
        required:true
    },
    Breath:{
        type:Number,
        required:true
    },
    Total_area:{
        type:Number,
        required:true
    },
    area_unit:{
        type:Number,
        required:true
    },
    No_of_BHK:{
        type:Number,
        required:true
    },
    No_of_floor:{
        type:Number,
        required:true
    },
    Attached:{
        type:String,
        required:true
    },
    Western_toilet:{
        type:String,
        required:true
    },
    Furnished:{
        type:String,
        required:true
    },
    Car_parking:{
        type:String,
        required:true
    },
    Lift:{
        type:String,
        required:true
    },
    Electricity:{
        type:String,
        required:true,
        unique:true
    }, 
    Facing:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Mobile:{
        type:Number,
        min: 10,
        required:true
    },
    Posted_by:{
        type:String,
        required:true
    },
    Sale_type:{
        type:String,
        required:true
    },
    Featured_package:{
        type:String,
        required:true
    },
    PPD_Package:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    cloudinary_id:{
        type: String
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    City:{
        type:String,
        required:true
    },
    Area:{
        type:String,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Landmark:{
        type:String
    },
    Latitude:{
        Type:String
    },
    Longitude:{
        type:String
    }
})

const PropetyDetails = mongoose.model("Properties", propertyDetailsSchema);

module.exports = PropetyDetails;