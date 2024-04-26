const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
  const payload = {
    user: {
      id: id,
    },
  };

  return jwt.sign(payload, process.env._JWT_SECRET, { expiresIn: "3h" });
}

module.exports = jwtGenerator;