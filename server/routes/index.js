const Routes = require("express").Router();
const api = require("../routes/api");
const notFound = require("./notFound");
const errorHandle = require("./errorHandle");
const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser")

Routes.get("/", (req, res) => {
  if (req.user) return res.send(req.user);
  return res.send("Root");
});

Routes.post("/register", register);
Routes.post("/login", login);
Routes.get("/login", getCurrentUser);
Routes.get("/logout", logout);
Routes.use("/api", api);
Routes.use(notFound);
Routes.use(errorHandle);

module.exports = Routes;
