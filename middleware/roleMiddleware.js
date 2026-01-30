const roleMiddleware = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            msg: "Unauthorized: user not logged in"
        });
    }

    console.log("role : " + req.user.role);
    if (req.user.role != "admin") {
        return res.status(403).json({msg : "Access Denied , Only admin can perform this task "})
    }

    // only admin reaches here and go to next functionality
    next();
}

module.exports = roleMiddleware;