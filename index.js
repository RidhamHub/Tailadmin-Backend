require("dotenv").config();

const express = require('express');

const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

const  cookieParser = require('cookie-parser')

const Port = 7000;
mongoose.connect("mongodb+srv://root:root@ridham01.ogpjzk1.mongodb.net/tailadmin").then(e => console.log("MongoDB is connected successfully...."))

const userRouter = require('./routes/auth')
const productRouter = require('./routes/product')

const authmiddleware = require("./middleware/authmiddleware")


const multer = require("multer");

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                msg: "Image size too large. Max 2MB allowed.",
            });
        }
        return res.status(400).json({ msg: err.message });
    }

    if (err) {
        return res.status(400).json({ msg: err.message });
    }

    next();
});


app.use("/uploads", express.static("uploads"));

app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, //🔥 REQUIRED for cookies  , aa sikhvanu chhe ho....
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/auth", userRouter)
// app.use(authmiddleware)
app.use("/product",authmiddleware,productRouter);

app.listen(Port, () => {
    console.log("server started at port 7000");
})