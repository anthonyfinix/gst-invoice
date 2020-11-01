const { User } = require("../models");
const token = require("../util/token");

module.exports = async (req, res, next) => {
  // get tokens
  if (process.env.NODE_ENV === "development")
    res.set({ "Access-Control-Expose-Headers": "x-token" });
  const accessToken = req.header("x-token");
  const refreshToken = req.cookies.refreshToken;
  // if refresh token and access token exist
  if (refreshToken && accessToken) {
    let { error: accessTokenError, payload: accessTokenPayload } = token.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    // if accessToken expired
    if (accessTokenError && accessTokenError.message === "jwt expired") {
      let {
        username: accessTokenUsername,
        email: accessTokenEmail,
      } = token.getPayload(accessToken);
      // get access token user from db
      let accessTokenUser = await User.findOne({
        username: accessTokenUsername,
        email: accessTokenEmail,
      });
      // validate refresh token with accessToken user
      let refreshTokenSecret =
        process.env.JWT_SECRET + accessTokenUser.password;
      let { payload: refreshTokenPayload } = token.verify(
        refreshToken,
        refreshTokenSecret
      );
      if (refreshTokenPayload) {
        // if refresh token validates create new access token
        let newAccessToken = token.new(
          {
            name: accessTokenUser.name,
            username: accessTokenUsername,
            email: accessTokenEmail,
          },
          process.env.JWT_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "10m" }
        );
        // set new access token header
        res.set("x-token", newAccessToken);
        req.user = accessTokenPayload;
      }
    } else if (accessTokenPayload) {
      // if accessToken not expired set user
      res.set("x-token", accessToken);
      req.user = accessTokenPayload;
    }
  }
  next();
};
