const jwt = require("jsonwebtoken");
const { User } = require("../models");
const cookieParser = require("cookie-parser");

module.exports = async (req, res, next) => {
  const token = req.header("x-token");
  if (token) {
    try {
      let { name, username, email } = jwt.verify(token, process.env.JWT_SECRET);
      res.set({ "x-token": token });
      req.user = { name, username, email };
    } catch (error) {
      if (error.message === "jwt expired") {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
          const { username } = jwt.decode(refreshToken);
          const user = await User.findOne({ username });
          if (user) {
            let refreshSecret = process.env.JWT_SECRET + user.password;
            try {
              let { email } = await jwt.verify(refreshToken, refreshSecret);
              req.user = user;
              let accessToken = jwt.sign(
                { name: user.name, username: user.username, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '10m' }
              );
              res.set({ "x-token": accessToken });
              if (process.env.NODE_ENV === "development"){
                res.set({ "Access-Control-Expose-Headers": "x-token" });
              }
            } catch (error) {
              console.log(`refresh token ${error.message}`);
            }
          }
        }
      }
    }
  }
  next();
};
