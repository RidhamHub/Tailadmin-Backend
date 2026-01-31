const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {

    try {
        const accessToken = req.cookies.accessToken || req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

        if (!accessToken) {
            return res.status(401).json({ msg: "Access denied. token not found for authentication" });
        }
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded;
        next();

    }
    catch (e) {
        console.log("error in authmiddleware : ", e);
        return res.status(401).json({ msg: "Invalid or expired accessToken " })
    }

}

module.exports = authMiddleware;