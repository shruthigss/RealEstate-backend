const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FormSchema = new Schema({
    property: {type: String},
    contact: {type: Number},
    area: { type: Number },
    view: { type: Number },
    status: String,
    daysleft: Number
})
const Formuser = mongoose.model("Formuser", FormSchema)
module.exports = Formuser