const express = require("express");
const router = require("./router/router.js");
const mongoose = require("mongoose");
const app = express();
const cors=require('cors')
const db = "mongodb+srv://buiducduy:Buiducduy%4007062000@cluster0.fugtbzu.mongodb.net/foodRhino";

const PORT = process.env.PORT || 3000;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{console.log('ket noi db thanh cong');});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
//   });
app.use(cors())
app.options('*',cors())

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
router(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


