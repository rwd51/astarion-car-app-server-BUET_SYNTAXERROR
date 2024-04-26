// Assuming you have access to the necessary dependencies and models
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator.js");
const dotenv = require("dotenv");

dotenv.config();

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const is_verify = async (req, res) => {
  try {
    res.status(200).json({
      message: "Token is valid",
      state: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

/*const register = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    let user = await User.findOne({ name : name });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    

    res
      .status(200)
      .json({
        success: true,
        message: "Registration successful",
        user: newUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error! Registration failed. Please try again after some time",
      });
  }
};
*/
/*const register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      let user = await User.findOne({ name: name });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      console.log(name, email, password, role);
      const hashedPassword = await hashPassword(password);
      console.log("Hashed password:", hashedPassword);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      console.log("New user created:", newUser);
  
      res.status(200).json({
        success: true,
        message: "Registration successful",
        user: newUser,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({
        message: "Error! Registration failed. Please try again after some time",
      });
    }
  };
  */
  const register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Validate request body
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Validate role
      const validRoles = ['buyer', 'seller', 'admin'];
      if (!validRoles.includes(role.toLowerCase())) {
        return res.status(400).json({ message: "Invalid role" });
      }
  
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await hashPassword(password);
  
      // Create new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role.toLowerCase(), // Ensure role is lowercase
      });
      
      res.status(200).json({
        success: true,
        message: "Registration successful",
        user: newUser,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({
        message: "Error! Registration failed. Please try again after some time",
      });
    }
  };
  

// Login Controller
const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    let user = await User.findOne({ name : name });

    if (!user) {
      return res.status(400).json({ message: "Invalid n_id or password!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid n_id or password!" });
    }

    const token = jwtGenerator(user._id);
    res
      .status(200)
      .json({
        success: true,
        token: token,
        message: "Login successful",
        user: user,
      });
  } catch (error) {
    res.status(500).json({message: "Login Unsuccessful! Please try again after some time!"});
  }
};



module.exports = {
  register,
  login,
  is_verify,
};