const express=require('express');
const router = require('express').Router();
const cors=require('cors');
router.use(express.json());
router.use(cors());
const  Formuser=require("../models/formSchema");
const verifyToken=require("../middleware/auth");
router.post("/form",verifyToken,async (req, res) => {
    try {
        let id="PPD"+Math.floor((Math.random()))
        var maxNumber = 10;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        var myArray = [
            // "Sold",
            "unsold",
        ];
        var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
        const changenumber = () => {
            if (randomItem == "unsold") {
                var maximumNumber = 45
                return Math.floor((Math.random() * maximumNumber) + 1);
            } else {
                return 0
            }
        }
        let formdata = new Formuser({

            property: req.body.property,
            contact: req.body.contact,
            area: req.body.area,
            view: randomNumber,
            status: randomItem,
            daysleft: changenumber()
        })
        let data = await formdata.save()
        res.status(200).json({data})
    } catch (err) {
        res.status(404).json({message:err.message})
    }
})
router.get("/form",verifyToken, async (req, res) => {
    try {
        let data = await Formuser.find()
        res.status(200).json(data.reverse());
    } catch (err) {
        res.status(400).send(err.message)
    }
})
module.exports=router

