const User = require("../Model/userModel/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../Unitl/jwt");
const shortid = require("shortid");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

//user register

const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } =
    req.body;

  const UserExist = await User.findOne({ email });

  if (UserExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });
  // console.log(req.body);
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      Token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("error occured");
  }
});

//user login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user.isBlock) {
    res.status(400);
    res.json({
      iserror: "ADMIN IS BLOCKED THIS USER",
    });
  } else {
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        isBlock: user.isBlock,
        name: user.name,
        IsBlock: user.isBlock,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Email OR Password Not matching");
    }
  }
});


module.exports = {
  RegisterUser,
  loginUser,
};
