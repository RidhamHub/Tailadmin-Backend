const express = require("express");
const router = express.Router();

const { createUser, handleLogout, handleLoginUser, handleRefershToken, verifyHandle } = require("../controller/auth");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authmiddleware");

router.get("/me", authMiddleware, (req, res) => {
    res.json({
        isAuthenticated: true,
        role: req.user.role,
        userId: req.user.id,
    });
});

router.post("/signup", upload.single("profileImage"), createUser)
router.post("/login", handleLoginUser)
router.post("/logout", handleLogout)
router.post('/refresh', handleRefershToken); // 401 ni bad request ave to aa call karavi levanu frontend mathi , so accessToken cretae thay jay authomatically....


module.exports = router;