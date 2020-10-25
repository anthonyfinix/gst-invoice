const bcrypt = require("bcrypt");
const { User } = require("../models");
const validator = require("../util/validation");
module.exports = async (req, res) => {
  // redirect if user exists
  if (req.user) return res.json({ error: "you are already login" });
  // validate data
  const { name, username, password, email } = req.body;
  let { error } = validator.register.validate({
    name,
    username,
    password,
    email,
  });
  if (error) return res.json({ error: error.details[0].message });
  // check user existence in db
  let usernameExist = await User.findOne({ username });
  if (!!usernameExist) return res.json({ error: "Username already exist" });
  let emailExist = await User.findOne({ email });
  if (!!emailExist) return res.json({ error: "Email already in use" });
  // hash password
  let hashPassword = await bcrypt.hash(password, 10);
  // create and save user
  let user = new User({ name, username, password: hashPassword, email });
  let newUser = await user.save();
  // respond
  res.json({ message: `User ${newUser.name} Registered` });
};
