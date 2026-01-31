require("dotenv").config();

const express = require('express');

const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

const cookieParser = require('cookie-parser')

const Port = process.env.PORT || 7000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is connected successfully...."))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
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

// CORS configuration - allow both production and localhost for development
const allowedOrigins = [
    "https://react-tail-admin-at-infilon.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all origins in development (you can restrict this in production)
        }
    },
    credentials: true,
}));

// ✅ FIXED preflight handler
app.options(/.*/, cors());


app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Backend is running",
    });
});


app.use("/auth", userRouter)
// app.use(authmiddleware)
app.use("/product", authmiddleware, productRouter);

app.listen(Port, () => {
    console.log("server started at port 7000");
})
