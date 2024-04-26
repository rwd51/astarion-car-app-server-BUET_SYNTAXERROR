const express = require("express");
const authorize = require("../middleware/auth.middleware.js");
const router = express.Router();
const { register, login, is_verify } = require("../controllers/auth.controller.js");

router.post("/register", register);
router.post("/login", login);
router.get("/is_verify", authorize, is_verify);

module.exports = router;

