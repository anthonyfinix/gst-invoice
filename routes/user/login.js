const { loginSchema } = require("../../validate");
const User = require("../../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function (req, res) {
  const { username, password } = req.body;
  const { error } = loginSchema.validate({ username, password });
  if (error) return res.status(400).json({ error: error.details[0].message });
  User.findOne({ username })
    .then((user) => {
      if (!user) return res.json({ error: "no user found!" });
      bcrypt.compare(password, user.password, (err, isMatched) => {
        if (err) return res.status(500).json({ error: "error encounter while decripting password" });
        if (!isMatched) return res.status(400).json({ error: "Password does not match" });
        const token = jwt.sign({ userId: user._id }, "secretKey");
        let userDetails = {
          userId: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
        };
        return res
          .set({
            "auth-token": token,
            "Access-Control-Expose-Headers": "auth-token",
          })
          .json({ ...userDetails });
      });
    })
    .catch((err) => {
      return res.status(500).res.json({ error: "there is some error" });
    })
};
