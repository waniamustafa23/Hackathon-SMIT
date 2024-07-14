const User = require("../models/user");
var bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await User.create({
    name,
    email,
    password: hashPassword,
  });
  res.send({ status: 200, data: result });
};
const getUser = async (req, res) => {
  const result = await User.find();
  res.send({ status: 200, data: result });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.send({ status: 404, data: "no user is found" });
  }
  bcrypt.compare(password, user.password, function (err, res) {
    if (err) {
      res.send({ status: 404, data: "password is incorrect" });
    }
    // logic
    res.send({ status: 200, data: user });
  });
};

module.exports = {
  createUser,
  getUser,
};
