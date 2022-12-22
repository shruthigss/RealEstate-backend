const router = require("express").Router();
const propertySchema = require("../models/propertySchema");

router.get("/allproperties", (req, res) => {
  propertySchema.find()
    .populate("postedBy", "name")
    .then((properties) => {
      res.json({ properties });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addproperty", (req, res) => {
  const property = new propertySchema({
    Property_type,
    Negotable,
    Price,
    OwnerShip,
    Property_age: req.body.Property_age,
    Property_Approved,
    Property_Description,
    Bank_loan,
    Length,
    Breadth,
    Total_area,
    area_unit,
    No_of_BHK,
    No_of_floor,
    Attached,
    Western_toilet,
    Furnished,
    Car_parking,
    Lift,
    Electricity,
    Facing,
    Name,
    Mobile,
    Posted_by,
    Sale_type,
    Featured_package,
    PPD_Package,
    Email,
    City,
    Area,
    Pincode,
    Address,
    Landmark,
    Latitude,
    Longitude,
  });
  property
    .save()
    .then((result) => {
      res.json({ property: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
