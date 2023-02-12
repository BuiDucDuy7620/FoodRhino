const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookADemoSchema = new Schema({
    // _id: mongoose.ObjectId,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("BookADemo", BookADemoSchema);


