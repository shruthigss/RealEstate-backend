const express = require("express");
const router = express.Router();
const signup = require("./model/signup")
const propertyDetails = require("./model/propertydetails")
const cloudinary = require("cloudinary").v2;
const upload = require("./multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const secret = "RESTAPIAUTH";
const bodyParser = require("body-parser");


cloudinary.config({
    cloud_name: "dq025q89y",
    api_key: 398134747924423,
    api_secret: "cWzikQXWL-SkksB_2P3xeJZDi_8",
  });

  router.post('/signup', (req,res)=>{
    const signupUser = new signup({
        email:req.body.email,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword
    })
        if(password !== confirmpassword){
            res.send({
                message:"Password not matching with confirm password"
            })
        }
    signupUser.save()
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})


router.post("/signin", async(req,res)=>{
    try{
        const{email, password} = req.body;
        let login = await signup.find({email,password});
        if(!login){
         return res.status(409).json({
             status:"Failure",
             message:"No Account Exist"
         })
        }
        //if user already there compare the password
        if(login){
            // Create a token after login 
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: login._id
              }, secret);

            return res.json({
                status: "Success",
                message: "Login Succesful",
                token
            })
        }else {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid credentials"
            })
        }
    }
      catch (e) {
    res.json({
        status: "Failed",
        message: e.message
    })
}
})



router.post('/propertydetails',upload.single("image"),async (req,res)=>{
    try{
         // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

         // Create new user
        const Details = new propertyDetails({
            Property_type:req.body.Property_type,
            Negotable:req.body.Negotable,
            Price:req.body.Price,
            OwnerShip:req.body.OwnerShip,
            Property_age:req.body.Property_age,
            Property_Approved:req.body.Property_Approved,
            Property_Description:req.body.Property_Description,
            Bank_loan:req.body.Bank_loan,
            Length:req.body.Length,
            Breath:req.body.Breath,
            Total_area:req.body.Total_area,
            area_unit:req.body.area_unit,
            No_of_BHK:req.body.No_of_BHK,
            No_of_floor:req.body.No_of_floor,
            Attached:req.body.Attached,
            Western_toilet:req.body.Western_toilet,
            Furnished:req.body.Furnished,
            Car_parking:req.body.Car_parking,
            Lift:req.body.Lift,
            Electricity:req.body.Electricity,
            Facing:req.body.Facing,
            Name:req.body.Name,
            Mobile:req.body.Mobile,
            Posted_by:req.body.Posted_by,
            Sale_type:req.body.Sale_type,
            Featured_package:req.body.Featured_package,
            PPD_Package:req.body.PPD_Package,
            Email:req.body.Email,
            City:req.body.City,
            Area:req.body.Area,
            Pincode:req.body.Pincode,
            Address:req.body.Address,
            Landmark:req.body.Landmark,
            Latitude:req.body.Latitude,
            Longitude:req.body.Longitude,
            image: result.secure_url,
            cloudinary_id: result.public_id
        })

        // save user details in mongodb
    await Details.save()
    res.status(200).send({
        Details
    });
}catch(err){
    console.log(err)
}
}); 

router.get("/propertydetails", async (req,res)=>{
    
})

module.exports = router