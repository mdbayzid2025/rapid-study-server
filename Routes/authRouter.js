const { register, login, googleLogin, getAllUser, getSingleUser, refreshToken, logout } = require("../controllers/authController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware");


const authRouter = require("express").Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
// authRouter.post("/google/login", googleLogin)

authRouter.get("/users", authMiddleware, roleMiddleware(process.env.ACCESSABLE_ROLE),  getAllUser)

authRouter.get("/refresh-token", refreshToken);
authRouter.get("/logout", logout);

module.exports = authRouter