const { User } = require("../models");
const validate = require("../util/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // redirect if already logged in
  if (req.user) {
    return res.json({
      error: "You are already registered, Please logout first",
    });
  }
  // validate
  const { username, password } = req.body;
  let { error } = validate.login.validate({ username, password });
  if (error) return res.json({ error: error.details[0].message });
  const user = await User.findOne({ username });
  if (!user) return res.json({ error: "You are not Registered" });
  let result = await bcrypt.compare(password, user.password);
  if (!result) return res.json({ error: "Wrong Password" });

  // sign tokens
  let accessToken = jwt.sign(
    { name: user.name, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY  || '10m'}
  );

  let refreshToken = jwt.sign(
    { username: user.username, email: user.email },
    process.env.JWT_SECRET + user.password,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
  );

  // set header
  res.set({ "x-token": accessToken });
  if(process.env.NODE_ENV === 'development') res.set({"Access-Control-Expose-Headers": "x-token"})

  // set cookies
  let cookieParam = {
    expiresIn: process.env.COOKIE_EXPIRY,
    httpOnly: true,
  };
  if (process.env.NODE_ENV == "production") {
    cookieParam.secure;
  }
  res.cookie("refreshToken", refreshToken);

  // set response
  let response = {};
  response.name = user.name;
  response.username = user.username;
  response.email = user.email;
  response.accessToken = accessToken;
  res.json(response);
};
