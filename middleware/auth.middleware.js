const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

const authorize = async function (req, res, next) {
  let token = req.header("token");
  

  if (
    !token ||
    token === "undefined" ||
    token === "null" ||
    token === "" ||
    token === null
  ) {
    return res.status(403).json({ message: "Authorization denied" });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env._JWT_SECRET);
    const userId = verifiedToken.user.id;

    let user = await User.findOne({ _id: userId });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json("Unauthorized access");
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authorize;