// MODEL
// const userSchema = new Schema(
// {
//    name: { type: String, required: true },
//    email: { type: String, required: true, unique: true },
//    password: { type: String, required: true },
//    phone_number: { type: String, required: true },
//    gender: { type: String, required: true },
//    date_of_birth: { type: Date, required: true },
//    membership_status: { type: String, required: true },
// },
// );

const mongoose = require("mongoose");
const User = require("../models/userModel");
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"});
}


const signupUser = async (req, res) => {
  const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;

 try {
    if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status){
        throw Error("All fields must be filled!")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough!")
    }

    const exists = await User.findOne({email})

    if (exists) {
        throw Error("Email is in use already")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, 
        email, 
        password: hashedPassword, 
        phone_number, 
        gender, 
        date_of_birth, 
        membership_status 
    });

    const token = createToken(user._id)
    res.status(201).json({email, token});
 } catch (err) {
    res.status(400).json({error: err.message})
 }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw Error("All fields must be filled!")
        }

        const user = await User.findOne({email});
        if (!user) {
            throw Error("Incorrect email")
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error("Incorrect password")
        }

        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (err) {
        res.status(400).json({error: err.message})
    }

}




// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    //console.err(err);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to add user" });
  }
};

// GET /users/:userId
const getUserById = async (req, res) => {
  const { userId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to find user" });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate({_id: userId}, {...req.body}, { new: true });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete({_id: userId});
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};



module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  signupUser
};