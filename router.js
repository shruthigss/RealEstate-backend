const express = require("express");
const router = express.Router();
const signup = require("./model/signup")
const propertyDetails = require("./model/propertydetails")
const cloudinary = require("cloudinary").v2;
const upload = require("./multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "abcdefghi"
const bcrypt = require("bcryptjs")

router.use(express.json());

cloudinary.config({
    cloud_name: "dq025q89y",
    api_key: 398134747924423,
    api_secret: "cWzikQXWL-SkksB_2P3xeJZDi_8",
});

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            error: "please add all the fields"
        })
    }

    signup.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    error: "user already exists with that email"
                })
            }
            bcrypt.hash(password, 12).then((hashedpassword) => {
                const user = new signup({
                    email,
                    password: hashedpassword

                })
                user.save()
                    .then((user) => {
                        res.json({
                            message: "saved successfully"
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })

        })
        .catch((err) => {
            console.log(err)
        })
})


router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({
            error: "please add email or password"
        })
    }
    signup.findOne({ email: email }).then(savedUser => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email or password" })
        }
        bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if (doMatch) {
                    //res.json({message:"successfully signed in"})
                    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                    const { _id, email } = savedUser
                    res.json({ token, user: { _id, email } })
                } else {
                    return res.status(422).json({ error: "Invalid  password" })
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
})


let data = [];
router.post('/propertydetails', upload.single("image"), async (req, res) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Create new user
        let Details = data.push(propertyDetails.insertMany({
            Property_type: req.body.Property_type,
            Negotable: req.body.Negotable,
            Price: req.body.Price,
            OwnerShip: req.body.OwnerShip,
            Property_age: req.body.Property_age,
            Property_Approved: req.body.Property_Approved,
            Property_Description: req.body.Property_Description,
            Bank_loan: req.body.Bank_loan,
            Length: req.body.Length,
            Breath: req.body.Breath,
            Total_area: req.body.Total_area,
            area_unit: req.body.area_unit,
            No_of_BHK: req.body.No_of_BHK,
            No_of_floor: req.body.No_of_floor,
            Attached: req.body.Attached,
            Western_toilet: req.body.Western_toilet,
            Furnished: req.body.Furnished,
            Car_parking: req.body.Car_parking,
            Lift: req.body.Lift,
            Electricity: req.body.Electricity,
            Facing: req.body.Facing,
            Name: req.body.Name,
            Mobile: req.body.Mobile,
            Posted_by: req.body.Posted_by,
            Sale_type: req.body.Sale_type,
            Featured_package: req.body.Featured_package,
            PPD_Package: req.body.PPD_Package,
            Email: req.body.Email,
            City: req.body.City,
            Area: req.body.Area,
            Pincode: req.body.Pincode,
            Address: req.body.Address,
            Landmark: req.body.Landmark,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            images: result.secure_url,
            cloudinary_id: result.public_id,
            PPD_ID: "PPD"+Math.floor(Math.random()*10000),
            Days_left: Math.floor(Math.random()*100)
        }));

        res.json({
            status: "sucess",
            Details
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
        console.log(err)
    }
});

router.get("/propertydetails", async (req, res) => {
    try {
        const Details = await propertyDetails.find();
        res.json({
            status: "sucess",
            Details
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Failure",
            message: err.message
        })
    }
})

module.exports = router

//palaparthisatyanarayana.iit@gmail.com