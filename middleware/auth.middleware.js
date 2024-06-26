const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");

module.exports = async function (req, res, next) {
  let token = req.header("token");

  if (
    !token ||
    token === "undefined" ||
    token === "null" ||
    token === "" ||
    token === null
  ) {
    return res.status(403).json({ message: "authorization denied" });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env._JWT_SECRET);
    const n_id = verifiedToken.user.id; // Assuming the user_id is stored in verifiedToken.user
    // check this line again

    let user = await User.findOne({ _id: n_id });

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json("Unauthorized access");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};